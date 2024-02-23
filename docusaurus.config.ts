import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'
import { themes } from 'prism-react-renderer'
import { GiscusConfig } from './src/components/Comment'
import social from './data/social'

const beian = '闽ICP备2020017848号-2'
const beian1 = '闽公网安备35021102000847号'

const config: Config = {
  title: 'Ray的小站',
  url: 'https://ydaydayup.cn',
  baseUrl: '/',
  favicon: 'img/favicon-logo.png',
  organizationName: 'Ray',
  projectName: 'blog',
  customFields: {
    bio: '道阻且长，行则将至',
    description:
      '是一个由Ray创建的个人博客，主要分享编程开发知识和项目，该网站基于 React 驱动的静态网站生成器 Docusaurus 构建。',
  },
  themeConfig: {
    // announcementBar: {
    //   id: 'announcementBar-3',
    //   content: ``,
    // },
    metadata: [
      {
        name: 'keywords',
        content: 'Ray, ray',
      },
      {
        name: 'keywords',
        content: 'blog, javascript, typescript, node, react, vue, web',
      },
      {
        name: 'keywords',
        content: '编程爱好者, Web开发者, 写过爬虫, 学过逆向, 现在主攻ts全栈',
      },
    ],
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    navbar: {
      logo: {
        alt: 'Ray',
        src: 'img/favicon-logo.png',
        srcDark: 'img/favicon-logo.png',
      },
      hideOnScroll: true,
      items: [
        {
          label: '博客',
          position: 'right',
          to: 'blog',
        },
        {
          label: '项目',
          position: 'right',
          to: 'project',
        },
        {
          label: '归档',
          position: 'right',
          to: 'blog/archive',
        },
        {
          label: '笔记',
          position: 'right',
          to: 'docs/skill/',
        },
        {
          label: '工作随想',
          position: 'right',
          to: 'docs/thought_on_work/',
        },
        // {
        //   label: '工作随想2',
        //   position: 'right',
        //   to: 'docs/work/',
        // },
        {
          label: '资源',
          position: 'right',
          to: 'resource',
        },
        {
          label:  '友链',
          position: 'right',
          to: 'friends',
        },
        {
          label: '工具推荐',
          position: 'right',
          to: 'docs/tools/',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '学习',
          items: [
            { label: '博客', to: 'blog' },
            { label: '归档', to: 'blog/archive' },
            { label: '技术笔记', to: 'docs/skill' },
            { label: '实战项目', to: 'project' },
            { label: '前端示例', to: 'https://example.kuizuo.cn' },
          ],
        },
        {
          title: '社交媒体',
          items: [
            { label: '关于我', to: '/about' },
            { label: 'GitHub', href: social.github.href },
            { label: 'Twitter', href: social.twitter.href },
            { label: '掘金', href: social.juejin.href },
            { label: 'Discord', href: social.discord.href },
          ],
        },
        {
          title: '更多',
          items: [
            { label: '友链', position: 'right', to: 'friends' },
            { label: '导航', position: 'right', to: 'resources' },
            {
              html: `
                <a href="https://docusaurus.io/zh-CN/" target="_blank" rel="noreferrer noopener">
                  <img src="/img/buildwith.png" alt="build with docusaurus" width="120" height="50"/>
                <a/>
                `,
            },
          ],
        },
      ],
      copyright: `
        <p style="margin-bottom: 0;"><a href="http://beian.miit.gov.cn/">${beian}</a></p>
        <p style="display: inline-flex; align-items: center;"><img style="height:20px;margin-right: 0.5rem;" src="/img/police.png" alt="police" height="20"/><a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${beian1.match(
          /\d+/,
        )?.[0]}" >${beian1}</a></p>
        <p>Copyright © 2020 - PRESENT Ray Built with Docusaurus.</p>
        `,
    },
    // algolia: {
    //   appId: 'GV6YN1ODMO',
    //   apiKey: '50303937b0e4630bec4a20a14e3b7872',
    //   indexName: 'kuizuo',
    // },
    algolia: {
      appId: 'CP7031IGM2',
      apiKey: '2faf032dffcb1c0693f445fe157ddc9a',
      indexName: 'SunnyBlog',
      contextualSearch: true,
    },
    prism: {
      theme: themes.oneLight,
      darkTheme: themes.oneDark,
      additionalLanguages: [
        'bash',
        'json',
        'java',
        'python',
        'php',
        'graphql',
        'rust',
        'toml',
        'protobuf',
      ],
      defaultLanguage: 'javascript',
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
        {
          className: 'code-block-error-line',
          line: 'This will error',
        },
      ],
    },
    giscus: {
      repo: 'ydaydayup/myblog',
      repoId: 'R_kgDOKMY26A',
      category: 'Q&A',
      categoryId: 'DIC_kwDOKMY26M4CY_q7',
      theme: 'light',
      darkTheme: 'dark',
    }satisfies Partial<GiscusConfig>,
    // giscus: {
    //   repo: 'kuizuo/blog',
    //   repoId: 'MDEwOlJlcG9zaXRvcnkzOTc2MjU2MTI=',
    //   category: 'General',
    //   categoryId: 'DIC_kwDOF7NJDM4CPK95',
    //   theme: 'light',
    //   darkTheme: 'dark_dimmed',
    // } satisfies Partial<GiscusConfig>,
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    liveCodeBlock: { playgroundPosition: 'top' },
    zoom: {
      selector: '.markdown :not(em) > img',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(50, 50, 50)',
      },
    },
  } satisfies Preset.ThemeConfig,
  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          sidebarPath: 'sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: ['./src/css/custom.scss'],
        },
        sitemap: {
          priority: 0.5,
        },
        gtag: {
          trackingID: 'G-S4SD5NXWXF',
          anonymizeIP: true,
        },
        debug: process.env.NODE_ENV === 'development',
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    'docusaurus-plugin-image-zoom',
    'docusaurus-plugin-sass',
    '@docusaurus/plugin-ideal-image',
    ['docusaurus-plugin-baidu-tongji', { token: 'c9a3849aa75f9c4a4e65f846cd1a5155' }],
    [
      '@docusaurus/plugin-pwa',
      {
        debug: process.env.NODE_ENV === 'development',
        offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'],
        pwaHead: [
          { tagName: 'link', rel: 'icon', href: '/img/logo.png' },
          { tagName: 'link', rel: 'manifest', href: '/manifest.json' },
          { tagName: 'meta', name: 'theme-color', content: '#12affa' },
        ],
      },
    ],
    [
      './src/plugin/plugin-content-blog', // 为了实现全局 blog 数据，必须改写 plugin-content-blog 插件
      {
        path: 'blog',
        editUrl: ({ locale, blogDirPath, blogPath, permalink }) =>
          `https://github.com/kuizuo/blog/edit/main/${blogDirPath}/${blogPath}`,
        editLocalizedFiles: false,
        blogDescription: '代码人生：编织技术与生活的博客之旅',
        blogSidebarCount: 10,
        blogSidebarTitle: 'Blogs',
        postsPerPage: 10,
        showReadingTime: true,
        readingTime: ({ content, frontMatter, defaultReadingTime }) =>
          defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
        feedOptions: {
          type: 'all',
          title: 'Ray',
          copyright: `Copyright © ${new Date().getFullYear()} Ray Built with Docusaurus.<p><a href="http://beian.miit.gov.cn/" class="footer_lin">${beian}</a></p>`,
        },
      },
    ],
  ],
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'description',
        content: 'Ray的个人博客',
      },
    },
  ],
  stylesheets: [
    'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Normal.min.css',
    'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Semibold.min.css',
  ],
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['en', 'zh-CN'],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB',
      },
    },
  },
}

export default config
