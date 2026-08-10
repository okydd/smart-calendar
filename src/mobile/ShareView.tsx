import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin, Empty, Button, message, Input } from 'antd';
import { ArrowLeftOutlined, DownloadOutlined, CalendarOutlined, LockOutlined, AppstoreOutlined } from '@ant-design/icons';
import { readShare } from '../utils/share';
import { SHARE_ACCESS_PASSWORD } from '../constants';
import { parseDateStr, timeRangeLabel, weekdayCN, dayjs } from '../utils/date';
import type { CalendarEvent } from '../types';

interface SharePayload {
  createdAt?: string;
  rangeStart?: string;
  rangeEnd?: string;
  exportTime?: string;
  count?: number;
  events?: CalendarEvent[];
}

const UNLOCK_KEY = 'shareUnlocked';
const ALL = '__all__';

export default function ShareView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<SharePayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const msgApi = message;

  // 访问密码门：链接带 ?pwd=007722 自动解锁；否则需手动输入；会话内记住已解锁
  const [unlocked, setUnlocked] = useState<boolean>(() => {
    try {
      if (sessionStorage.getItem(UNLOCK_KEY) === '1') return true;
    } catch {
      /* ignore */
    }
    if (typeof location !== 'undefined') {
      const pwd = new URLSearchParams(location.search).get('pwd');
      if (pwd === SHARE_ACCESS_PASSWORD) {
        try {
          sessionStorage.setItem(UNLOCK_KEY, '1');
        } catch {
          /* ignore */
        }
        return true;
      }
    }
    return false;
  });
  const [pwdInput, setPwdInput] = useState('');
  const [pwdErr, setPwdErr] = useState('');

  const tryUnlock = () => {
    if (pwdInput === SHARE_ACCESS_PASSWORD) {
      try {
        sessionStorage.setItem(UNLOCK_KEY, '1');
      } catch {
        /* ignore */
      }
      setUnlocked(true);
    } else {
      setPwdErr('访问密码错误');
    }
  };

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!id) {
        if (alive) {
          setError('链接缺少分享 ID');
          setLoading(false);
        }
        return;
      }
      const res = await readShare(id);
      if (!alive) return;
      if (!res) {
        setError('未找到该分享数据，可能链接已失效或尚未生成');
        setLoading(false);
        return;
      }
      setData(res);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  const events = useMemo(
    () => (data?.events || []).filter((e: CalendarEvent) => !e.deleted),
    [data]
  );

  /** 按日期分组（YYYY-MM-DD 字典序即时间序） */
  const byDate = useMemo(() => {
    const m = new Map<string, CalendarEvent[]>();
    for (const e of events) {
      const arr = m.get(e.date) || [];
      arr.push(e);
      m.set(e.date, arr);
    }
    return [...m.entries()]
      .sort((a, b) => (a[0] < b[0] ? -1 : 1))
      .map(([date, list]) => ({ date, list }));
  }, [events]);

  /** 左侧导航：按 年→月 分组 */
  const navGroups = useMemo(() => {
    const groups: { key: string; label: string; dates: { date: string; list: CalendarEvent[] }[] }[] = [];
    for (const g of byDate) {
      const d = parseDateStr(g.date);
      if (!d.isValid()) continue;
      const key = `${d.year()}-${d.month() + 1}`;
      const label = `${d.year()}年${d.month() + 1}月`;
      let grp = groups.find((x) => x.key === key);
      if (!grp) {
        grp = { key, label, dates: [] };
        groups.push(grp);
      }
      grp.dates.push(g);
    }
    return groups;
  }, [byDate]);

  const [sel, setSel] = useState<string>(ALL);

  const current = useMemo(() => {
    if (sel === ALL) return byDate;
    const g = byDate.find((x) => x.date === sel);
    return g ? [g] : [];
  }, [sel, byDate]);

  // 未解锁：显示访问密码输入页
  if (!unlocked) {
    return (
      <div className="share-page">
        <div className="share-topbar">
          <button className="share-back" onClick={() => navigate('/calendar')}>
            <ArrowLeftOutlined /> 返回日历
          </button>
        </div>
        <div className="share-lock">
          <div className="share-lock-icon">
            <LockOutlined />
          </div>
          <div className="share-lock-title">该分享链接需要访问密码</div>
          <div className="share-lock-tip">请输入邮件中提供的访问密码以查看内容</div>
          <Input.Password
            className="share-lock-input"
            placeholder="访问密码"
            value={pwdInput}
            onChange={(e) => {
              setPwdInput(e.target.value);
              setPwdErr('');
            }}
            onPressEnter={tryUnlock}
            status={pwdErr ? 'error' : undefined}
            autoFocus
          />
          {pwdErr && <div className="share-lock-err">{pwdErr}</div>}
          <Button type="primary" block onClick={tryUnlock}>
            查看内容
          </Button>
        </div>
      </div>
    );
  }

  const downloadJson = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Calendar_Share_${dayjs().format('YYYYMMDD_HHmmss')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    msgApi.success('已下载 JSON');
  };

  const renderCard = (e: CalendarEvent) => {
    const d = parseDateStr(e.date);
    const dateLabel = d.isValid()
      ? `${d.year()}年${d.month() + 1}月${d.date()}日 ${weekdayCN(d)}`
      : e.date;
    return (
      <div className="share-card" key={e.id}>
        <div className="share-card-title">
          {e.title}
          {e.important && <span className="share-tag imp">重要</span>}
          {e.done && <span className="share-tag done">已完成</span>}
        </div>
        <div className="share-card-meta">📅 {dateLabel} ｜ 🕒 {timeRangeLabel(e)}</div>
        {e.description && <div className="share-card-desc">{e.description}</div>}
        {e.images && e.images.length > 0 && (
          <div className="share-card-imgs">
            {e.images.map((src, i) => (
              <img key={i} src={src} alt="事件图片" loading="lazy" />
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderDayHead = (date: string, count: number) => {
    const d = parseDateStr(date);
    const label = d.isValid()
      ? `${d.year()}年${d.month() + 1}月${d.date()}日 ${weekdayCN(d)}`
      : date;
    return (
      <div className="share-day-head">
        <span className="share-day-dot" />
        <span className="share-day-label">{label}</span>
        <span className="share-day-count">{count}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="share-loading">
        <Spin />
        <div className="share-loading-text">正在加载分享数据…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="share-page">
        <div className="share-topbar">
          <button className="share-back" onClick={() => navigate('/calendar')}>
            <ArrowLeftOutlined /> 返回日历
          </button>
        </div>
        <div className="share-error">
          <Empty description={error} />
        </div>
      </div>
    );
  }

  return (
    <div className="share-page">
      <div className="share-topbar">
        <button className="share-back" onClick={() => navigate('/calendar')}>
          <ArrowLeftOutlined /> 返回日历
        </button>
        <Button type="primary" size="small" icon={<DownloadOutlined />} onClick={downloadJson}>
          下载JSON
        </Button>
      </div>

      <div className="share-head">
        <div className="share-head-title">
          <CalendarOutlined /> 智能日历 · 数据分享
        </div>
        <div className="share-meta">
          {data?.rangeStart && data?.rangeEnd && (
            <span>范围：{data.rangeStart} 至 {data.rangeEnd}</span>
          )}
          {data?.exportTime && <span>导出：{data.exportTime}</span>}
          <span>共 {events.length} 条事件</span>
        </div>
      </div>

      <div className="share-shell">
        {/* 左侧：年月日时间导航 */}
        <aside className="share-nav">
          <button
            className={`share-nav-all${sel === ALL ? ' active' : ''}`}
            onClick={() => setSel(ALL)}
          >
            <AppstoreOutlined /> 全部日期
          </button>
          {navGroups.map((g) => (
            <div className="share-nav-group" key={g.key}>
              <div className="share-nav-group-label">{g.label}</div>
              {g.dates.map((d) => {
                const dd = parseDateStr(d.date);
                const dLabel = dd.isValid() ? `${dd.month() + 1}月${dd.date()}日 ${weekdayCN(dd)}` : d.date;
                return (
                  <button
                    key={d.date}
                    className={`share-nav-item${sel === d.date ? ' active' : ''}`}
                    onClick={() => setSel(d.date)}
                  >
                    <span className="share-nav-date">{dLabel}</span>
                    <span className="share-nav-count">{d.list.length}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </aside>

        {/* 中间：所选时间段/日期的全部事件完整信息 */}
        <main className="share-body">
          {current.length === 0 ? (
            <div className="share-empty-body">（无事件）</div>
          ) : (
            current.map((g) => (
              <section className="share-day" key={g.date}>
                {renderDayHead(g.date, g.list.length)}
                <div className="share-day-cards">
                  {g.list.map((e) => renderCard(e))}
                </div>
              </section>
            ))
          )}
        </main>
      </div>

      <div className="share-foot">
        本页面由「智能日历」生成 · 数据保存在日历的云端，链接可分享给任何人查看
      </div>
    </div>
  );
}
