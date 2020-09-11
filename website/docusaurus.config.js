module.exports = {
  title: 'ainsley-loader',
  tagline: 'Webpack loader for ainsley',
  url: 'https://tbjgolden.github.io',
  baseUrl: '/ainsley-loader/',
  favicon: 'img/favicon.ico',
  organizationName: 'tbjgolden',
  projectName: 'ainsley-loader',
  themeConfig: {
    navbar: {
      title: 'ainsley-loader',
      logo: {
        alt: 'ainsley-loader logo',
        src: 'img/logo.svg'
      },
      links: [
        {
          to: 'docs/doc1',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left'
        },
        { to: 'docs/api/index', label: 'API', position: 'left' },
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          href:
            'https://github.com/tbjgolden/ainsley-loader',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/doc1'
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2'
            }
          ]
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href:
                'https://stackoverflow.com/questions/tagged/ainsley-loader'
            }
            /*
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/ainsley-loader',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/ainsley-loader',
            },
            */
          ]
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog'
            },
            {
              label: 'GitHub',
              href:
                'https://github.com/tbjgolden/ainsley-loader'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ainsley-loader (Tom Golden). Built with Docusaurus.`
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebar'),
          editUrl:
            'https://github.com/tbjgolden/ainsley-loader/edit/master/website/'
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/tbjgolden/ainsley-loader/edit/master/website/blog/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ]
}
