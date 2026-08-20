import { useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ReadOutlined,
  LikeOutlined,
  LinkOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import { zhihuAnswers } from '../data/zhihu';

/** 点赞数格式化：>=1万显示「x.x万赞」（保留一位小数，去尾随 .0） */
function formatVote(n: number): string {
  if (n >= 10000) {
    const w = n / 10000;
    let s = w >= 100 ? Math.round(w).toString() : w.toFixed(1);
    s = s.replace(/\.0$/, '');
    return `${s}万`;
  }
  return `${n}`;
}

/**
 * 知乎页：收集知乎中点赞数超过 1 万的回答，按点赞从高到低排列。
 * 列表页展示排名 / 问题 / 答主 / 点赞数 / 摘要；点击进入完整详情页（非弹窗）。
 * 详情页为独立路由 /zhihu/:id，左上角有返回列表按钮，底部只有一个「查看原回答」链接。
 * 支持向右滑动返回列表（到一定距离触发）。数据为本地收藏（src/data/zhihu.ts），不进云同步。
 */
export default function ZhihuPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const detailId = id || null;

  // 向右滑动返回：记录起点，松手时若水平位移足够大且以横向为主，则回列表
  const touchRef = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const s = touchRef.current;
    touchRef.current = null;
    if (!s) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - s.x;
    const dy = t.clientY - s.y;
    // 向右滑（dx>0）且横向位移明显大于纵向，距离过阈值即返回
    if (dx > 70 && dx > Math.abs(dy) * 1.2) {
      navigate('/zhihu');
    }
  };

  // 过滤点赞 > 1万，并按点赞从高到低排序
  const list = useMemo(
    () =>
      [...zhihuAnswers]
        .filter((a) => a.voteUp > 10000)
        .sort((a, b) => b.voteUp - a.voteUp),
    []
  );

  const selected = list.find((a) => a.id === detailId) || null;

  // 列表摘要：优先用 excerpt，否则取正文前 48 字
  const excerptOf = (content: string, excerpt?: string) => {
    if (excerpt) return excerpt;
    const plain = content.replace(/\n+/g, ' ').trim();
    return plain.length > 48 ? plain.slice(0, 48) + '…' : plain;
  };

  // ===== 详情页（完整页面，非弹窗）=====
  if (selected) {
    const rank = list.findIndex((x) => x.id === selected.id) + 1;
    return (
      <div
        className="page zhihu-detail-page"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <header className="zhihu-detail-bar">
          <button className="zhihu-back" onClick={() => navigate('/zhihu')}>
            <ArrowLeftOutlined />
            <span>返回</span>
          </button>
          <div className="zhihu-detail-bar-title">{selected.question}</div>
        </header>

        <article className="zhihu-detail">
          <div className="zhihu-detail-rank">第 {rank} 名 · 高赞回答</div>
          <h1 className="zhihu-detail-q">{selected.question}</h1>

          <div className="zhihu-detail-author-row">
            <div className="zhihu-detail-avatar">{selected.author.slice(0, 1)}</div>
            <div className="zhihu-detail-author-meta">
              <div className="zhihu-detail-author-name">{selected.author}</div>
              <div className="zhihu-detail-author-sub">知乎高赞答主</div>
            </div>
            {selected.grade && (
              <span className={`zhihu-detail-grade grade-${selected.grade}`}>{selected.grade}</span>
            )}
          </div>

          <div className="zhihu-detail-meta">
            <span className="zhihu-detail-vote">
              <LikeOutlined /> {formatVote(selected.voteUp)}赞
            </span>
            {typeof selected.commentCount === 'number' && (
              <span className="zhihu-detail-cmtcount">评论 {selected.commentCount}</span>
            )}
          </div>

          <div className="zhihu-detail-content">
            {selected.content.split('\n').map((p, idx) =>
              p.trim() === '' ? (
                <div key={idx} className="zhihu-detail-gap" />
              ) : (
                <p key={idx} className="zhihu-detail-p">
                  {p}
                </p>
              )
            )}
          </div>

          {selected.comments && selected.comments.length > 0 && (
            <div className="zhihu-detail-comments">
              <div className="zhihu-detail-comments-title">精选评论（{selected.comments.length}）</div>
              {selected.comments.slice(0, 10).map((c, idx) => (
                <div key={idx} className="zhihu-detail-comment">
                  <div className="zhihu-detail-comment-head">
                    <span className="zhihu-detail-comment-author">{c.author}</span>
                    <span className="zhihu-detail-comment-vote">{c.voteCount}赞</span>
                  </div>
                  <div className="zhihu-detail-comment-content">{c.content}</div>
                </div>
              ))}
            </div>
          )}
        </article>

        {selected.link && (
          <a
            className="zhihu-detail-footlink"
            href={selected.link}
            target="_blank"
            rel="noreferrer"
          >
            <LinkOutlined /> 查看原回答（在知乎客户端打开）
          </a>
        )}
      </div>
    );
  }

  // ===== 列表页 =====
  return (
    <div className="page zhihu-page">
      <div className="zhihu-head">
        <ReadOutlined className="zhihu-head-ico" />
        <span className="zhihu-head-title">知乎 · 高赞回答</span>
        <span className="zhihu-head-sub">按点赞从高到低 · 仅显示 &gt; 1万赞</span>
      </div>

      <div className="zhihu-list">
        {list.length === 0 ? (
          <div className="zhihu-empty">
            <ReadOutlined className="zhihu-empty-ico" />
            <p>暂无点赞超过 1 万的回答</p>
          </div>
        ) : (
          list.map((a, i) => (
            <div
              key={a.id}
              className="zhihu-card"
              onClick={() => navigate(`/zhihu/${a.id}`)}
            >
              <div className="zhihu-rank">{i + 1}</div>
              <div className="zhihu-card-body">
                <div className="zhihu-q">{a.question}</div>
                <div className="zhihu-meta">
                  <span className="zhihu-author">{a.author}</span>
                  <span className="zhihu-vote">
                    <LikeOutlined /> {formatVote(a.voteUp)}赞
                  </span>
                </div>
                <div className="zhihu-excerpt">{excerptOf(a.content, a.excerpt)}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
