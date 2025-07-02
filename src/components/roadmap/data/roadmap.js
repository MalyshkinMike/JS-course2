const roadmap = [
  {
    id: 'welcome',
    title: 'Welcoming course',
    optional: false,
    dependsOn: [],
    modules: [
      { id: 'how-to-use', title: 'How to use me', status: 'completed', link: '/docs/' },
    ],
  },
  {
    id: 'css',
    title: 'CSS',
    optional: false,
    dependsOn: ['welcome'],
    modules: [
      { id: 'css-selectors', title: 'Selectors', status: 'incomplete', link: '/docs/css/selectors.md' },
      { id: 'css-box', title: 'Box Model', status: 'incomplete', link: '/docs/css/css-box.md'},
    ],
  },
  {
    id: 'html',
    title: 'HTML',
    optional: false,
    dependsOn: ['welcome'],
    modules: [
      { id: 'html-tags', title: 'Tags', status: 'incomplete', link: '/docs/html/html-tags.md' },
      { id: 'document-object-model', title: 'DOM', status: 'incomplete', link: '/docs/html/dom.md' },
    ],
  },
  {
    id: 'js1',
    title: 'JS part 1',
    optional: false,
    dependsOn: ['html', 'css'],
    modules: [
      { id: 'html-tags', title: 'Tags', status: 'incomplete', link: '/docs/html/html-tags.md' },
      { id: 'document-object-model', title: 'DOM', status: 'incomplete', link: '/docs/html/dom.md' },
    ],
  }
];

export default roadmap;