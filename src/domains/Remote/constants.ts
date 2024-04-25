const baseUrl = "http://192.168.86.141/goform/";
const directBaseUrl = `${baseUrl}formiPhoneAppDirect.xml?`;

export const COMMANDS = {
  power_on: `${baseUrl}formiPhoneAppPower.xml?1+PowerOn`,
  power_off: `${baseUrl}formiPhoneAppPower.xml?1+PowerStandby`,
  volume_up: `${baseUrl}formiPhoneAppDirect.xml?MVUP`,
  volume_down: `${baseUrl}formiPhoneAppDirect.xml?MVDOWN`,
  volume_set: `${baseUrl}formiPhoneAppVolume.xml?1+`,
  options: `${directBaseUrl}MNMEN%20ON`,
  exit_options: `${directBaseUrl}MNMEN%20OFF`,
  up: `${directBaseUrl}MNCUP`,
  down: `${directBaseUrl}MNCDN`,
  left: `${directBaseUrl}MNCLT`,
  right: `${directBaseUrl}MNCRT`,
  enter: `${directBaseUrl}MNENT`,
  mute: `${baseUrl}formiPhoneAppMute.xml?1+MuteOn`,
  unmute: `${baseUrl}formiPhoneAppMute.xml?1+MuteOff`,
};
