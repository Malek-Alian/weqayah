import { lazy } from 'react';

const HomePage = lazy(() => import('./pages/homePage/HomePage'));
const SigninPage = lazy(() => import('./pages/signin/SigninPage'));
const SignupPage = lazy(() => import('./pages/signup/SignupPage'));
const FindDoctorPage = lazy(() => import('./pages/findDoctor/FindDoctorPage'));
const AboutUsPage = lazy(() => import('./pages/aboutUs/AboutUsPage'));
const HelpPage = lazy(() => import('./pages/help/HelpPage'));
const MedicalNewsPage = lazy(() =>
  import('./pages/medicalNews/MedicalNewsPage')
);
const BlogPage = lazy(() => import('./pages/blog/BlogPage'));
const PostPage = lazy(() => import('./pages/post/PostPage'));

const AdminPage = lazy(() => import('./pages/admin/AdminPage'));

const NotFoundPage = lazy(() => import('./pages/notFound/NotFoundPage'));

export const routes = {
  home: {
    path: '/',
    component: HomePage,
    title: 'Home',
  },
  signin: {
    path: '/signin',
    component: SigninPage,
    title: 'Sign In',
  },
  signup: {
    path: '/signup',
    component: SignupPage,
    title: 'Sign Up',
  },
  findDoctor: {
    path: '/find-doctor',
    component: FindDoctorPage,
    title: 'Find Doctor',
  },
  aboutUs: {
    path: '/about-us',
    component: AboutUsPage,
    title: 'About Us',
  },
  help: {
    path: '/help',
    component: HelpPage,
    title: 'Help',
  },
  medicalNews: {
    path: '/medical-news',
    component: MedicalNewsPage,
    title: 'Medical News',
  },
  blog: {
    path: '/blog',
    component: BlogPage,
    title: 'Our Blogs',
  },
  blogPost: {
    path: '/blog/:postId',
    component: PostPage,
    title: 'Blog Post',
  },
  medicalNewsPost: {
    path: '/medical-news/:postId',
    component: PostPage,
    title: 'Medical News Post',
  },
  admin: {
    path: '/admin',
    component: AdminPage,
    title: 'Admin Panel',
    protected: true,
  },
  notFound: {
    path: '*',
    component: NotFoundPage,
    title: 'Page Not Found',
  },
};

export {
  HomePage,
  SigninPage,
  SignupPage,
  FindDoctorPage,
  AboutUsPage,
  HelpPage,
  MedicalNewsPage,
  BlogPage,
  PostPage,
  AdminPage,
  NotFoundPage,
};
