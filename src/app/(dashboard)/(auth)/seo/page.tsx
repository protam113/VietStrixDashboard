'use client';

import BackButton from '@/components/button/BackButton';
import Container from '@/components/container/Container';
import { SeoSettingsForm } from '@/components/pages/seo/updateSeoForm';
import Heading from '@/components/heading/Heading';

const Page = () => {
  return (
    <Container>
      <BackButton />
      <Heading name="SEO Page" desc="Manage your seo website here" />

      <SeoSettingsForm />
    </Container>
  );
};

export default Page;
