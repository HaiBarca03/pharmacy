import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllArticle } from '../../stores/Article/ArticleApis'
import { Row, Col } from 'antd'
import './ArticleHomePage.css'
import CreateArticleForm from '../../components/Article/CreateArticleForm'
import ArticleList from '../../components/Article/ArticleList'

const ArticleHomePage = () => {
  const articleList = useSelector(
    (state) => state.article.articleList?.articles || []
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllArticle())
  }, [dispatch])

  return (
    <div className="article-home-container">
      <div className="category-header">
        <p className="breadcrumb">
          <a href="/" className="breadcrumb-home">
            Trang chủ
          </a>{' '}
          &raquo; <span className="breadcrumb-category">Bài viết</span>
        </p>
        <h2 className="category-title">Bài viết</h2>
      </div>
      <Row gutter={16}>
        <Col span={14}>
          <ArticleList articles={articleList} />
        </Col>
        <Col span={10}>
          <CreateArticleForm />
        </Col>
      </Row>
    </div>
  )
}

export default ArticleHomePage
