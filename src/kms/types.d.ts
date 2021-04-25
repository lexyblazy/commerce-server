type Environment = keyof Settings;

type SettingsUnion =
  | (Settings["development"]["plain"] & Settings["development"]["encrypted"])
  | (Settings["staging"]["plain"] & Settings["staging"]["encrypted"]);

type KMSSettingKey = keyof SettingsUnion;
