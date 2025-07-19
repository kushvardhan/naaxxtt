// RightSidebar.tsx (Server Component - no 'use client')
import React from 'react'
import { getHotQuestions } from '../../../lib/actions/question.action';
import { getTopPopularTags } from '../../../lib/actions/tag.action';
import RightSidebarClient from './RightSideBarClient';

const RightSidebar = async () => {
  const hotQuestions = await getHotQuestions();
  const popularTags = await getTopPopularTags();

  return (
    <RightSidebarClient hotQuestions={hotQuestions} popularTags={popularTags} />
  )
}

export default RightSidebar;
