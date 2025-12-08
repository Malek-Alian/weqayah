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

/**
 * Route configuration
 *
 * Each route can have the following optional properties:
 * - requiresAuth: boolean - If true, user must be logged in to access this route
 * - allowedRoles: string[] - Array of roles that can access this route (e.g., ['admin', 'doctor'])
 *
 * If both are specified, user must be authenticated AND have one of the allowed roles.
 */
export const routes = {
  home: {
    path: '/',
    component: HomePage,
    title: 'Home',
    requiresAuth: false,
  },
  signin: {
    path: '/signin',
    component: SigninPage,
    title: 'Sign In',
    requiresAuth: false,
  },
  signup: {
    path: '/signup',
    component: SignupPage,
    title: 'Sign Up',
    requiresAuth: false,
  },
  findDoctor: {
    path: '/find-doctor',
    component: FindDoctorPage,
    title: 'Find Doctor',
    requiresAuth: false,
  },
  aboutUs: {
    path: '/about-us',
    component: AboutUsPage,
    title: 'About Us',
    requiresAuth: false,
  },
  help: {
    path: '/help',
    component: HelpPage,
    title: 'Help',
    requiresAuth: false,
  },
  medicalNews: {
    path: '/medical-news',
    component: MedicalNewsPage,
    title: 'Medical News',
    requiresAuth: false,
  },
  blog: {
    path: '/blog',
    component: BlogPage,
    title: 'Our Blogs',
    requiresAuth: false,
  },
  blogPost: {
    path: '/blog/:postId',
    component: PostPage,
    title: 'Blog Post',
    requiresAuth: false,
  },
  medicalNewsPost: {
    path: '/medical-news/:postId',
    component: PostPage,
    title: 'Medical News Post',
    requiresAuth: false,
  },
  admin: {
    path: '/admin',
    component: AdminPage,
    title: 'Admin Panel',
    allowedRoles: ['ADMIN'],
    requiresAuth: true,
  },
  notFound: {
    path: '*',
    component: NotFoundPage,
    title: 'Page Not Found',
    requiresAuth: false,
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
