import React from 'react';
import { makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Hero from './Hero';
import Features from './Features';
import Testimonials from './Testimonials';
import CTA from './CTA';
import FAQS from './FAQS';
import Footer from './Footer';
import LastestNews from './LatestNews';

const useStyles = makeStyles(() => ({
  root: {}
}));

const HomeView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Home">
      <Hero />
      <Features />
      <LastestNews />
      <Testimonials />
      <CTA />
      <FAQS />
      <Footer />
    </Page>
  );
};

export default HomeView;
