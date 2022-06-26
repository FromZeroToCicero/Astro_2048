function createMenuTemplate(isMac, isDev, app, createAboutWindow, mainWindow) {
  return [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              {
                label: "About Astro 2048",
                click: createAboutWindow,
              },
              {
                type: "separator",
              },
              {
                role: "hide",
              },
              {
                role: "hideOthers",
              },
              {
                role: "unhide",
              },
              {
                type: "separator",
              },
              {
                label: "Quit Astro 2048",
                click: () => app.quit(),
                accelerator: "Command+Q",
              },
            ],
          },
        ]
      : []),
    {
      label: "File",
      submenu: [isMac ? { role: "close" } : { role: "quit" }],
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forcereload" },
        { type: "separator" },
        { role: "resetzoom" },
        { role: "zoomin" },
        { role: "zoomout" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    {
      label: "Window",
      submenu: [
        {
          role: "minimize",
        },
        ...(isMac
          ? [
              { role: "close" },
              { type: "separator" },
              { role: "front" },
              { type: "separator" },
              {
                label: "Astro 2048",
                click: () => mainWindow.show(),
              },
            ]
          : [{ role: "close" }]),
      ],
    },
    {
      role: "help",
      submenu: [
        {
          label: "About Astro 2048",
          click: createAboutWindow,
        },
        {
          label: "Learn More",
          click: async () => {
            const { shell } = require("electron");
            await shell.openExternal(
              "https://github.com/FromZeroToCicero/Astro_2048"
            );
          },
        },
      ],
    },
    ...(isDev
      ? [
          {
            label: "Developer",
            submenu: [
              {
                role: "reload",
              },
              {
                role: "forcereload",
              },
              {
                type: "separator",
              },
              {
                role: "toggledevtools",
              },
            ],
          },
        ]
      : []),
  ];
}

module.exports = { createMenuTemplate };
