import React from 'react';
import Layout from '@theme/Layout';
import RoadmapGraph from '../components/roadmap/RoadmapGraph';

export default function MyPage() {
  return (
    <Layout title="Roadmap Test">
      <main>
        <RoadmapGraph />
      </main>
    </Layout>
  );
}
