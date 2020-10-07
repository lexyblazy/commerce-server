interface KMSSettings {
  development: typeof import("./development");
  staging: typeof import("./staging");
}
