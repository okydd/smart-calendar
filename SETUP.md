# 智能日历 · 云同步与长期托管配置指南

按本文操作后，你将得到：

- 手机与电脑登录**同一个邮箱账号**，日程自动双向同步
- 数据存放在**你自己的**云数据库里，别人看不到，也不会随浏览器清理而丢失
- 一个**长期稳定、不会失效**的访问网址

全程免费，两部分加起来大约 20 分钟。

---

## 第一部分 · 开通云同步（约 10 分钟）

### 步骤 1：注册 Supabase

1. 打开 <https://supabase.com>，点右上角 **Start your project**
2. 用 GitHub 账号或邮箱注册（免费，无需信用卡）
3. 登录后点 **New project**，填写：
   - **Name**：随便填，例如 `calendar`
   - **Database Password**：设一个数据库密码，**请单独记下来**（这个不是登录 App 用的密码，但以后可能会用到）
   - **Region**：选 **Southeast Asia (Singapore)**，国内访问最快
4. 点 **Create new project**，等待约 2 分钟初始化完成

### 步骤 2：创建数据表

1. 在项目左侧菜单点 **SQL Editor** → **New query**
2. 把下面整段复制粘贴进去，点右下角 **Run**（或按 Ctrl+Enter）

```sql
create table if not exists public.calendar_events (
  id          text        not null,
  user_id     uuid        not null references auth.users(id) on delete cascade,
  title       text        not null default '',
  date        text        not null default '',
  start_time  text        not null default '',
  end_time    text        not null default '',
  all_day     boolean     not null default false,
  description text        not null default '',
  tag         text        not null default 'purple',
  done        boolean     not null default false,
  deleted     boolean     not null default false,
  updated_at  timestamptz not null default now(),
  primary key (user_id, id)
);

alter table public.calendar_events enable row level security;

create policy "read own"   on public.calendar_events
  for select using (auth.uid() = user_id);
create policy "insert own" on public.calendar_events
  for insert with check (auth.uid() = user_id);
create policy "update own" on public.calendar_events
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "delete own" on public.calendar_events
  for delete using (auth.uid() = user_id);

create index if not exists calendar_events_user_updated_idx
  on public.calendar_events (user_id, updated_at desc);
```

看到 **Success. No rows returned** 就说明成功了。

> 这段 SQL 里的 `row level security` 和四条 policy 是关键安全设置：它保证**每个账号只能读写自己的数据**，即使有人拿到了下一步的 anon key 也看不到你的日程。

### 步骤 3（可选但推荐）：关掉邮箱验证

默认注册后需要去邮箱点验证链接。如果只有你自己用，可以关掉，注册完直接就能用：

**Authentication** → **Sign In / Providers** → **Email** → 关闭 **Confirm email** → **Save**

### 步骤 4：复制两个连接参数

左下角 **Settings**（齿轮）→ **API**，复制这两项：

| 参数 | 位置 | 样子 |
|---|---|---|
| **Project URL** | Project URL 区块 | `https://abcdefgh.supabase.co` |
| **anon public** | Project API keys 区块 | `eyJhbGciOiJIUzI1NiIs...`（很长一串） |

> **anon key 可以公开吗？** 可以。它只是让程序知道该连哪个项目，真正的权限由上面的 RLS 策略和你的登录账号决定。这是 Supabase 的标准用法。

### 步骤 5：在 App 里填入并登录

1. 打开智能日历，点顶部的 **云图标**（或「更多 → 云同步」）
2. 把 Project URL 和 anon public key 粘贴进去，点**保存连接参数**
3. 点「还没有账号？去注册」，填入你的邮箱和密码（至少 6 位），点**注册新账号**
4. 注册成功后会自动同步，顶部云图标变绿

**在另一台设备上**：打开同一个网址 → 云同步 → 填入**相同的**两个参数 → 用**同一个邮箱密码登录** → 数据立刻同步过来。

> 如果按第三部分部署到了 GitHub Pages 并配置了 Secrets，其它设备连参数都不用填，直接登录即可。

---

## 第二部分 · 同步是怎么工作的

- **实时性**：修改后 1.5 秒自动上传；每 60 秒、以及每次切回 App 时自动拉取云端
- **冲突处理**：同一条日程在两台设备上都改了，以**最后修改的那次为准**
- **删除同步**：删除会作为「墓碑记录」同步到其它设备，不会出现删了又冒出来的情况
- **离线可用**：没网时照常增删改查，联网后自动补传
- **不影响本地**：即使不登录，App 也完全可用，数据存在本机

---

## 第三部分 · 部署到 GitHub Pages（约 10 分钟）

这样你会得到一个形如 `https://你的用户名.github.io/smart-calendar/` 的**永久网址**。

### 步骤 1：注册并新建仓库

1. 打开 <https://github.com> 注册账号（已有则跳过）
2. 点右上角 **+** → **New repository**
   - **Repository name**：`smart-calendar`
   - 选 **Public**（Public 仓库的 Pages 才免费）
   - 不要勾选任何初始化选项
3. 点 **Create repository**

### 步骤 2：上传代码

在本项目目录（`E:\教学小工具\日历记录`）打开命令行，依次执行（把 `你的用户名` 换掉）：

```bash
git init
git add .
git commit -m "智能日历：日程管理 + 云同步 + 长图导出"
git branch -M main
git remote add origin https://github.com/你的用户名/smart-calendar.git
git push -u origin main
```

> 没装 git 的话，也可以在仓库页面点 **uploading an existing file**，把项目文件夹里除 `node_modules`、`dist` 之外的所有文件拖进去上传。

### 步骤 3：开启 Pages

仓库页面 → **Settings** → 左侧 **Pages** → **Source** 选择 **GitHub Actions** → 保存。

### 步骤 4（可选）：把同步参数写进部署

这样所有设备打开就已经配好了，只需登录：

**Settings** → **Secrets and variables** → **Actions** → **New repository secret**，添加两条：

| Name | Secret |
|---|---|
| `VITE_SUPABASE_URL` | 你的 Project URL |
| `VITE_SUPABASE_ANON_KEY` | 你的 anon public key |

添加后到 **Actions** 标签页点最新一次运行 → **Re-run all jobs** 重新构建。

### 步骤 5：等待部署完成

**Actions** 标签页会看到工作流在跑，约 1-2 分钟出现绿色对勾。然后回到 **Settings → Pages**，页面顶部会显示你的网址。

手机浏览器打开该网址 →「添加到主屏幕」，就装好了。

---

## 常见问题

**Q：提示「云端数据表未创建」**
第一部分步骤 2 的 SQL 没执行成功，回去重新执行一遍。

**Q：提示「邮箱尚未验证」**
去邮箱收件箱（含垃圾箱）点验证链接；或按步骤 3 关掉邮箱验证后重新注册。

**Q：提示「权限策略未生效」**
SQL 里的四条 `create policy` 没跑成功。可以在 **Table Editor → calendar_events → 右上角 RLS** 里确认策略是否存在。

**Q：两台设备数据没同步**
检查三点：① 两边填的 Project URL 是否完全一致；② 是否登录的是同一个邮箱；③ 顶部云图标是否为绿色。可点「立即同步」手动触发。

**Q：忘记密码**
云同步面板填入邮箱后点「忘记密码」，会收到重置邮件。

**Q：想换个数据库 / 停用同步**
云同步面板底部「断开云同步」，清除本机配置并回到纯本地模式，云端数据不受影响。

**Q：本地开发怎么跑**

```bash
npm install
npm run dev     # 开发预览 http://localhost:5173
npm run build   # 生产构建，产物在 dist/
```

Windows 下如果 `npm run build` 报 `safe-delete` 相关错误，先手动删掉 `dist` 文件夹再构建。
