interface Settings {
  development: typeof import("./development");
  staging: typeof import("./staging");
}
