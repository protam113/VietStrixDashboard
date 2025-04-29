'use client';

import PushButton from '@/components/button/PushButton';
import Container from '@/components/container/Container';
import ServiceListDataAdmin from '@/components/pages/service/ServiceList';
import Heading from '@/components/heading/Heading';
import React from 'react';

const Page = () => {
  return (
    <Container>
      <div className="flex items-center justify-between mb-4">
        <Heading
          name="Service Page"
          desc="Manage all services available on the platform. You can create, update, or remove services and ensure that each one is clearly described and up-to-date for users."
        />
        <PushButton href="/services/create_service" label="Create Service" />
      </div>

      <ServiceListDataAdmin />
    </Container>
  );
};

export default Page;
