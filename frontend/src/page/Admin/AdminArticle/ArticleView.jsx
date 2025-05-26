import React from 'react'
import { Modal } from 'antd'

const ArticleViewModal = ({ visible, article, onClose }) => {
  return (
    <Modal
      visible={visible}
      title={article?.title}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <p>
        <b>Tác giả:</b> {article?.User?.name || 'Không rõ'}
      </p>
      <p>
        <b>Ngày tạo:</b>{' '}
        {article ? new Date(article.created_at).toLocaleString() : ''}
      </p>
      <hr />
      <p>{article?.content}</p>
    </Modal>
  )
}

export default ArticleViewModal
