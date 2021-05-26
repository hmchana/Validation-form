import React from 'react';
import moment from 'moment';
import { Col, Row, Typography, Space, Card, Tag } from 'antd';

const { Text, Title } = Typography;

const Repo = ({ repo }) => {
  const {
    owner: { avatar_url },
    name,
    description,
    stargazers_count,
    open_issues_count,
    pushed_at
  } = repo;

  return (
    <Row>
      <Col span={6}>
        <img style={{ height: '20%' }} src={avatar_url} alt='avatar' />
      </Col>
      <Col span={12}>
        <Row gutter={[0, 24]}>
          <Col span={24}>
            <Title level={2}>{name}</Title>
          </Col>
          <Col span={24}>
            <Text>{description}</Text>
          </Col>
          <Col span={8}>
            <Tag color='magenta'>
              {stargazers_count} {'  '}stars
            </Tag>
          </Col>
          <Col span={8}>
            <Tag color='red'>
              {open_issues_count} {'  '}Issues
            </Tag>
          </Col>
          <Col span={8}>
            Submitted {'  '}
            {moment(pushed_at, 'YYYYMMDD').fromNow()} by {'  '} {name}
          </Col>
          <Col></Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Repo;
