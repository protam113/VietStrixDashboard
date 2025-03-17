'use client';

import RichEditor from '@/components/rich-text/RichEditor';
import React, { useState } from 'react';
import { Form, Input, Button, Card, Checkbox, message, Row, Col } from 'antd';
import Heading from '@/components/heading/Heading';
import BackButton from '@/components/button/BackButton';
import useSlugify from '@/hooks/useSlugify';
import useValidation from '@/lib/useValidation';

const Page = () => {
  const [form] = Form.useForm();
  const { slug, toSlug } = useSlugify();
  const [title, setTitle] = useState('');
  const { validateURL } = useValidation();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    toSlug(value);
  };

  const Click = () => {
    console.log('click');
  };

  return (
    <div
      style={{ padding: '20px', maxWidth: '100%', margin: '0 auto' }}
      className="max-w-3xl"
    >
      <BackButton />
      <Heading name="Create Blog" />
      <Form form={form} layout="vertical">
        <Row gutter={[12, 24]}>
          <Col span={12}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please enter title!' }]}
            >
              <Input placeholder="Enter article title" />
            </Form.Item>
            <Form.Item label="Slug" name="title">
              <Input placeholder="" value={slug} readOnly />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Link"
              name="link"
              rules={[{ validator: validateURL }]}
            >
              <Input placeholder="Enter article source link" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Content"
              name="content"
              rules={[{ required: true, message: 'Please enter content!' }]}
            >
              <Input placeholder="Enter short content of the article" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Chi tiết bài viết" name="description">
              <RichEditor />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <button onClick={Click}>Save</button>
    </div>
  );
};

export default Page;
