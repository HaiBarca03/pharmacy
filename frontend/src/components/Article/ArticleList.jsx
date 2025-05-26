import React from 'react'
import { Card, Typography } from 'antd'
import '../../page/Article/ArticleHomePage.css'

const { Title, Paragraph, Text } = Typography

const ArticleList = ({ articles }) => {
  return (
    <div className="article-list">
      {articles.map((article) => (
        <Card key={article.id} className="article-card" hoverable>
          <Title level={5}>{article.title}</Title>
          <Text type="secondary">
            Tác giả: {article.User?.name || 'Ẩn danh'} |{' '}
            {new Date(article.created_at).toLocaleString()}
          </Text>
          <Paragraph style={{ marginTop: 10 }}>{article.content}</Paragraph>
        </Card>
      ))}
    </div>
  )
}

export default ArticleList
