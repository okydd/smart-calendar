import { useMemo, useState } from 'react';
import { Modal } from 'antd';
import { ReadOutlined, LikeOutlined, LinkOutlined } from '@ant-design/icons';
import { zhihuAnswers } from '../data/zhihu';

/** 点赞数格式化：>=1万显示「x.x万赞」（保留一位小数，去尾随 .0） */
function formatVote(n: number): string {
  if (n >= 10000) {
    const w = n / 10000;
    let s = w >= 100 ? Math.round(w).toString() : w.toFixed(1);
    s = s.replace(/\.0$/, '');
    return `${s}万赞`;
  }
  return `${n}赞`;
}

/**
 * 知乎页：收集知乎中点赞数超过 1 万的回答，按点赞从高到低排列。
 * 列表页展示排名 / 问题 / 答主 / 点赞数 / 摘要；点击查看完整回答详情。
 * 数据为本地收藏（src/data/zhihu.ts），不进云同步。
 */
export default function ZhihuPage() {
  const [detailId, setDetailId] = useState<string | null>(null);

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
              onClick={() => setDetailId(a.id)}
            >
              <div className="zhihu-rank">{i + 1}</div>
              <div className="zhihu-card-body">
                <div className="zhihu-q">{a.question}</div>
                <div className="zhihu-meta">
                  <span className="zhihu-author">{a.author}</span>
                  <span className="zhihu-vote">
                    <LikeOutlined /> {formatVote(a.voteUp)}
                  </span>
                </div>
                <div className="zhihu-excerpt">{excerptOf(a.content, a.excerpt)}</div>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal
        open={!!selected}
        title={null}
        onCancel={() => setDetailId(null)}
        footer={null}
        destroyOnClose
        centered
        className="zhihu-detail-modal"
      >
        {selected && (
          <div className="zhihu-detail">
            <div className="zhihu-detail-rank">第 {list.findIndex((x) => x.id === selected.id) + 1} 名 · 高赞回答</div>
            <div className="zhihu-detail-q">{selected.question}</div>
            <div className="zhihu-detail-meta">
              <span className="zhihu-detail-author">{selected.author}</span>
              <span className="zhihu-detail-vote">
                <LikeOutlined /> {formatVote(selected.voteUp)}
              </span>
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

            {selected.link && (
              <a
                className="zhihu-detail-link"
                href={selected.link}
                target="_blank"
                rel="noreferrer"
              >
                <LinkOutlined /> 查看原回答
              </a>
            )}

            <button className="zhihu-detail-close" onClick={() => setDetailId(null)}>
              关闭
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
