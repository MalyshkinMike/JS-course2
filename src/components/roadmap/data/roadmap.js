const roadmap = [
  {
    id: "welcome",
    title: "Welcoming course",
    optional: false,
    dependsOn: [],
    modules: [
      {
        id: "how-to-use",
        title: "How to use me",
        status: "completed",
        theory: "/docs/welcome/howto.md",
        test: "/tests/welcome/howto",
      },
    ],
    test: "tests/welcome/final/",
  },
  {
    id: "css",
    title: "CSS",
    optional: false,
    dependsOn: ["welcome"],
    modules: [
      {
        id: "css-selectors",
        title: "Selectors",
        status: "incomplete",
        theory: "/docs/css/selectors.md",
        test: "tests/css/selectors/",
      },
      {
        id: "css-box",
        title: "Box Model",
        status: "incomplete",
        theory: "/docs/css/css-box.md",
        test: "tests/css/box/",
      },
    ],
    test: "tests/css/final/",
  },
  {
    id: "html",
    title: "HTML",
    optional: false,
    dependsOn: ["welcome"],
    modules: [
      {
        id: "html-tags",
        title: "Tags",
        status: "incomplete",
        theory: "/docs/html/html-tags.md",
        test: "tests/html/tags",
      },
      {
        id: "document-object-model",
        title: "DOM",
        status: "incomplete",
        theory: "/docs/html/dom.md",
        test: "tests/html/dom",
      },
    ],
    test: "tests/html/final",
  },
  {
    id: "js1",
    title: "JS part 1",
    optional: false,
    dependsOn: ["html", "css"],
    modules: [
      {
        id: "html-tags",
        title: "Tags",
        status: "incomplete",
        theory: "/docs/html/html-tags.md",
        test: "tests/html/tags",
      },
      {
        id: "document-object-model",
        title: "DOM",
        status: "incomplete",
        theory: "/docs/html/dom.md",
        test: "tests/html/dom",
      },
    ],
    test: "tests/html/final",
  },
];

export default roadmap;
