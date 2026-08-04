/**
 * 中国大陆裸连可达性检测（绕过本机代理）
 *
 * 用途：判断 GitHub Pages（程序托管）与 Supabase（数据同步）在不使用
 *       特殊上网方式的情况下能否正常访问，并给出成功率与延迟。
 *
 * 运行：
 *   env -u HTTP_PROXY -u HTTPS_PROXY node scripts/netcheck.mjs
 *
 * 说明：使用底层 tls / net 套接字，Node 不读取系统 HTTP 代理设置，
 *       因此结果为真实直连数据（前提：代理未开启 TUN 全局模式）。
 */
import dns from 'node:dns';
import tls from 'node:tls';

const ROUNDS = 5;

const GROUPS = [
  {
    title: 'A · GitHub —— 程序托管 / 代码上传',
    hosts: [
      ['github.com', 'GitHub 主站（登录、建仓库）'],
      ['api.github.com', 'GitHub API（自动化脚本用）'],
      ['codeload.github.com', '代码上传下载'],
      ['github.githubassets.com', '页面静态资源'],
      ['octocaptcha.com', '注册人机验证'],
      ['raw.githubusercontent.com', '原始文件'],
      ['octocat.github.io', 'GitHub Pages ★日常访问的网址'],
    ],
  },
  {
    title: 'B · Supabase —— 云端数据同步',
    hosts: [
      ['supabase.com', '官网 / 控制台'],
      ['api.supabase.com', '管理 API'],
      ['supabase.co', '项目 API 域名'],
      ['aws-0-ap-northeast-1.pooler.supabase.com', '东京数据库节点 ★同步链路'],
      ['challenges.cloudflare.com', '注册验证码'],
    ],
  },
  {
    title: 'C · 备选平台对比',
    hosts: [
      ['edgeone.app', '腾讯云 EdgeOne Pages'],
      ['pages.dev', 'Cloudflare Pages'],
      ['vercel.app', 'Vercel'],
      ['netlify.app', 'Netlify'],
      ['gitee.com', 'Gitee 码云'],
      ['tcb-api.tencentcloudapi.com', '腾讯云 CloudBase'],
      ['api.leancloud.cn', 'LeanCloud 国内版'],
    ],
  },
];

function isBogus(ip) {
  return (
    ip.startsWith('198.18.') || ip.startsWith('0.') || ip === '127.0.0.1' ||
    ip.startsWith('243.') || ip.startsWith('59.24.3.') || ip.startsWith('46.82.174.')
  );
}

async function resolveCheck(host) {
  const r = new dns.promises.Resolver({ timeout: 5000, tries: 1 });
  r.setServers(['223.5.5.5']); // 阿里公共 DNS，模拟普通用户
  try {
    const ips = await r.resolve4(host);
    return { ips, bogus: ips.some(isBogus) };
  } catch (e) {
    return { err: e.code || e.message };
  }
}

function handshake(host, timeout = 9000) {
  return new Promise((resolve) => {
    const t0 = Date.now();
    const s = tls.connect({ host, port: 443, servername: host, rejectUnauthorized: false });
    const done = (r) => { s.destroy(); resolve(r); };
    s.setTimeout(timeout);
    s.on('secureConnect', () => done({ ok: true, ms: Date.now() - t0 }));
    s.on('timeout', () => done({ ok: false, err: '超时(疑似阻断)' }));
    s.on('error', (e) => done({ ok: false, err: e.code || e.message }));
  });
}

console.log(`\n中国大陆裸连检测 · 每项 ${ROUNDS} 次 · ${new Date().toLocaleString('zh-CN')}\n`);

for (const g of GROUPS) {
  console.log(`\n===== ${g.title} =====\n`);
  for (const [host, label] of g.hosts) {
    const d = await resolveCheck(host);
    if (d.err) {
      console.log(`✗ ${host.padEnd(42)} ${label.padEnd(30)} DNS 解析失败 (${d.err})`);
      continue;
    }
    const rs = [];
    for (let i = 0; i < ROUNDS; i++) rs.push(await handshake(host));
    const ok = rs.filter((r) => r.ok);
    const rate = Math.round((ok.length / ROUNDS) * 100);
    const avg = ok.length ? Math.round(ok.reduce((a, b) => a + b.ms, 0) / ok.length) : 0;
    const max = ok.length ? Math.max(...ok.map((r) => r.ms)) : 0;
    const errs = [...new Set(rs.filter((r) => !r.ok).map((r) => r.err))];
    const mark = rate === 100 ? '✓' : rate >= 60 ? '△' : rate > 0 ? '⚠' : '✗';
    console.log(
      `${mark} ${host.padEnd(42)} ${label.padEnd(30)} ` +
      `${String(rate).padStart(4)}%  均${String(avg || '--').padStart(5)}ms  峰${String(max || '--').padStart(5)}ms  ` +
      `${d.bogus ? '⚠DNS可疑 ' : ''}${errs.join('/')}`
    );
  }
}

console.log('\n判读：✓ 可用   △ 偶发失败   ⚠ 不稳定   ✗ 基本不可用');
console.log('注意：结果仅代表当前运营商 / 地区 / 时段，手机移动网络需另行实测。\n');
