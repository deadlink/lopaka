const standardFontsRegex =
  /[^0-9a-zA-Z\s\:\!\"\.\#\$\%\&\'\(\)\*\+\,\-\.\/\?]/g;
const numberFontsRegex = /[^0-9\s\,\.\/\-\*\+\:]/g;

const DEFAULT_STRING = "String 123";

const fontMap = {
  flipper: {
    default: "helvB08_tr",
    helvB08_tr: "FontPrimary",
    haxrcorp4089_tr: "FontSecondary",
    profont22_tr: "FontBigNumbers",
  },
  u8g2: {
    default: "haxrcorp4089_tr",
    helvB08_tr: "u8g2_font_helvB08_tr",
    haxrcorp4089_tr: "u8g2_font_haxrcorp4089_tr",
    profont22_tr: "u8g2_font_profont22_tr",
    f4x6_tr: "u8g2_font_4x6_tr",
  },
  uint32: {
    default: "haxrcorp4089_tr",
    helvB08_tr: "u8g2_font_helvB08_tr",
    haxrcorp4089_tr: "u8g2_font_haxrcorp4089_tr",
    profont22_tr: "u8g2_font_profont22_tr",
    f4x6_tr: "u8g2_font_4x6_tr",
  },
  adafruit_gfx: {
    default: "adafruit",
    adafruit: "adafruit",
  },
};

const FONT_SIZES = {
  helvB08_tr: 8,
  haxrcorp4089_tr: 16,
  profont22_tr: 22,
  f4x6_tr: 6,
  adafruit: 8,
};

const textContainerHeight = {
  helvB08_tr: 8,
  haxrcorp4089_tr: 8,
  profont22_tr: 16,
  f4x6_tr: 6,
  adafruit: 7,
};

const textCharWidth = {
  helvB08_tr: 5,
  haxrcorp4089_tr: 4,
  profont22_tr: 11,
  f4x6_tr: 4,
  adafruit: 5,
};

const LIBRARIES = {
  u8g2: "U8g2",
  adafruit_gfx: "Adafruit GFX",
  flipper: "Flipper Zero",
  uint32: "uint32 RAW",
};

const codeDeclarators = {
  u8g2: getU8g2Declarations,
  flipper: getFlipperDeclarations,
  adafruit_gfx: getAdafruitFGXDeclarations,
};

const invertedHeaders = {
  flipper: `canvas_draw_box(canvas, 0, 0, 127, 63);
canvas_set_color(canvas, ColorWhite);

`,
  u8g2: `
u8g2.drawBox(0, 0, 127, 63);
u8g2.setDrawColor(0);

`,
};

const ICONS_SRC = {
  "125_10px": "125_10px.png",
  // "ActiveConnection_50x64": "ActiveConnection_50x64.png",
  Alert_9x8: "Alert_9x8.png",
  ArrowC_1_36x36: "ArrowC_1_36x36.png",
  ArrowDownEmpty_14x15: "ArrowDownEmpty_14x15.png",
  ArrowDownFilled_14x15: "ArrowDownFilled_14x15.png",
  ArrowUpEmpty_14x15: "ArrowUpEmpty_14x15.png",
  ArrowUpFilled_14x15: "ArrowUpFilled_14x15.png",
  Attention_5x8: "Attention_5x8.png",
  // "Auth_62x31": "Auth_62x31.png",
  back_10px: "back_10px.png",
  // "Background_128x11": "Background_128x11.png",
  badusb_10px: "badusb_10px.png",
  Battery_16x16: "Battery_16x16.png",
  Battery_26x8: "Battery_26x8.png",
  // "BatteryBody_52x28": "BatteryBody_52x28.png",
  Ble_connected_15x15: "Ble_connected_15x15.png",
  Ble_disconnected_15x15: "Ble_disconnected_15x15.png",
  // "BLE_Pairing_128x64": "BLE_Pairing_128x64.png",
  Bluetooth_Connected_16x8: "Bluetooth_Connected_16x8.png",
  Bluetooth_Idle_5x8: "Bluetooth_Idle_5x8.png",
  Button_18x18: "Button_18x18.png",
  ButtonCenter_7x7: "ButtonCenter_7x7.png",
  ButtonDown_7x4: "ButtonDown_7x4.png",
  ButtonLeft_4x7: "ButtonLeft_4x7.png",
  ButtonLeftSmall_3x5: "ButtonLeftSmall_3x5.png",
  ButtonRight_4x7: "ButtonRight_4x7.png",
  ButtonRightSmall_3x5: "ButtonRightSmall_3x5.png",
  ButtonUp_7x4: "ButtonUp_7x4.png",
  // "Certification1_103x56": "Certification1_103x56.png",
  // "Certification2_98x33": "Certification2_98x33.png",
  "Charging-lightning_9x10": "Charging-lightning_9x10.png",
  "Charging-lightning_mask_9x10": "Charging-lightning_mask_9x10.png",
  // "Circles_47x47": "Circles_47x47.png",
  Clock_18x18: "Clock_18x18.png",
  // "Connect_me_62x31": "Connect_me_62x31.png",
  // "Connected_62x31": "Connected_62x31.png",
  CoolHi_25x27: "CoolHi_25x27.png",
  CoolHi_hvr_25x27: "CoolHi_hvr_25x27.png",
  CoolLo_25x27: "CoolLo_25x27.png",
  CoolLo_hvr_25x27: "CoolLo_hvr_25x27.png",
  // "Cry_dolph_55x52": "Cry_dolph_55x52.png",
  Dehumidify_25x27: "Dehumidify_25x27.png",
  Dehumidify_hvr_25x27: "Dehumidify_hvr_25x27.png",
  Detailed_chip_17x13: "Detailed_chip_17x13.png",
  // "DFU_128x50": "DFU_128x50.png",
  dir_10px: "dir_10px.png",
  // "DolphinCommon_56x48": "DolphinCommon_56x48.png",
  // "DolphinMafia_115x62": "DolphinMafia_115x62.png",
  // "DolphinNice_96x59": "DolphinNice_96x59.png",
  // "DolphinReadingSuccess_59x63": "DolphinReadingSuccess_59x63.png",
  // "DolphinWait_61x59": "DolphinWait_61x59.png",
  // "DoorLeft_70x55": "DoorLeft_70x55.png",
  // "DoorRight_70x55": "DoorRight_70x55.png",
  Down_25x27: "Down_25x27.png",
  Down_hvr_25x27: "Down_hvr_25x27.png",
  // "Drive_112x35": "Drive_112x35.png",
  Error_18x18: "Error_18x18.png",
  // "Error_62x31": "Error_62x31.png",
  EviSmile1_18x21: "EviSmile1_18x21.png",
  EviSmile2_18x21: "EviSmile2_18x21.png",
  EviWaiting1_18x21: "EviWaiting1_18x21.png",
  EviWaiting2_18x21: "EviWaiting2_18x21.png",
  FaceCharging_29x14: "FaceCharging_29x14.png",
  FaceConfused_29x14: "FaceConfused_29x14.png",
  FaceNopower_29x14: "FaceNopower_29x14.png",
  FaceNormal_29x14: "FaceNormal_29x14.png",
  GameMode_11x8: "GameMode_11x8.png",
  Health_16x16: "Health_16x16.png",
  HeatHi_25x27: "HeatHi_25x27.png",
  HeatHi_hvr_25x27: "HeatHi_hvr_25x27.png",
  HeatLo_25x27: "HeatLo_25x27.png",
  HeatLo_hvr_25x27: "HeatLo_hvr_25x27.png",
  Hidden_window_9x8: "Hidden_window_9x8.png",
  ibutt_10px: "ibutt_10px.png",
  // "iButtonDolphinVerySuccess_108x52": "iButtonDolphinVerySuccess_108x52.png",
  // "iButtonKey_49x44": "iButtonKey_49x44.png",
  InfraredArrowDown_4x8: "InfraredArrowDown_4x8.png",
  InfraredArrowUp_4x8: "InfraredArrowUp_4x8.png",
  // "InfraredLearnShort_128x31": "InfraredLearnShort_128x31.png",
  ir_10px: "ir_10px.png",
  KeyBackspace_16x9: "KeyBackspace_16x9.png",
  KeyBackspaceSelected_16x9: "KeyBackspaceSelected_16x9.png",
  Keychain_39x36: "Keychain_39x36.png",
  KeySave_24x11: "KeySave_24x11.png",
  KeySaveSelected_24x11: "KeySaveSelected_24x11.png",
  Left_mouse_icon_9x9: "Left_mouse_icon_9x9.png",
  loading_10px: "loading_10px.png",
  Lock_7x8: "Lock_7x8.png",
  Lock_8x8: "Lock_8x8.png",
  "Medium-chip-22x21": "Medium-chip-22x21.png",
  MHz_25x11: "MHz_25x11.png",
  Modern_reader_18x34: "Modern_reader_18x34.png",
  Move_flipper_26x39: "Move_flipper_26x39.png",
  music_10px: "music_10px.png",
  Mute_25x27: "Mute_25x27.png",
  Mute_hvr_25x27: "Mute_hvr_25x27.png",
  Nfc_10px: "Nfc_10px.png",
  // "NFC_manual_60x50": "NFC_manual_60x50.png",
  Off_25x27: "Off_25x27.png",
  Off_hvr_25x27: "Off_hvr_25x27.png",
  Ok_btn_9x9: "Ok_btn_9x9.png",
  Ok_btn_pressed_13x13: "Ok_btn_pressed_13x13.png",
  // "passport_bad1_46x49": "passport_bad1_46x49.png",
  // "passport_bad2_46x49": "passport_bad2_46x49.png",
  // "passport_bad3_46x49": "passport_bad3_46x49.png",
  // "passport_bottom_128x18": "passport_bottom_128x18.png",
  // "passport_happy1_46x49": "passport_happy1_46x49.png",
  // "passport_happy2_46x49": "passport_happy2_46x49.png",
  // "passport_happy3_46x49": "passport_happy3_46x49.png",
  // passport_left_6x46: "passport_left_6x46.png",
  // "passport_okay1_46x49": "passport_okay1_46x49.png",
  // "passport_okay2_46x49": "passport_okay2_46x49.png",
  // "passport_okay3_46x49": "passport_okay3_46x49.png",
  Percent_10x14: "Percent_10x14.png",
  Pin_arrow_down_7x9: "Pin_arrow_down_7x9.png",
  Pin_arrow_left_9x7: "Pin_arrow_left_9x7.png",
  Pin_arrow_right_9x7: "Pin_arrow_right_9x7.png",
  Pin_arrow_up_7x9: "Pin_arrow_up_7x9.png",
  Pin_attention_dpad_29x29: "Pin_attention_dpad_29x29.png",
  Pin_back_arrow_10x8: "Pin_back_arrow_10x8.png",
  Pin_back_full_40x8: "Pin_back_full_40x8.png",
  Pin_pointer_5x3: "Pin_pointer_5x3.png",
  Pin_star_7x7: "Pin_star_7x7.png",
  Power_25x27: "Power_25x27.png",
  Power_hvr_25x27: "Power_hvr_25x27.png",
  Pressed_Button_13x13: "Pressed_Button_13x13.png",
  Quest_7x8: "Quest_7x8.png",
  // "Reader_detect_43x40": "Reader_detect_43x40.png",
  Release_arrow_18x15: "Release_arrow_18x15.png",
  Restoring_38x32: "Restoring_38x32.png",
  RFIDBigChip_37x36: "RFIDBigChip_37x36.png",
  // "RFIDDolphinReceive_97x61": "RFIDDolphinReceive_97x61.png",
  // "RFIDDolphinSend_97x61": "RFIDDolphinSend_97x61.png",
  // "RFIDDolphinSuccess_108x57": "RFIDDolphinSuccess_108x57.png",
  Right_mouse_icon_9x9: "Right_mouse_icon_9x9.png",
  // "Scanning_123x52": "Scanning_123x52.png",
  SDcardFail_11x8: "SDcardFail_11x8.png",
  SDcardMounted_11x8: "SDcardMounted_11x8.png",
  SDQuestion_35x43: "SDQuestion_35x43.png",
  SmallArrowDown_3x5: "SmallArrowDown_3x5.png",
  SmallArrowDown_4x7: "SmallArrowDown_4x7.png",
  SmallArrowUp_3x5: "SmallArrowUp_3x5.png",
  SmallArrowUp_4x7: "SmallArrowUp_4x7.png",
  Smile_18x18: "Smile_18x18.png",
  // "Space_65x18": "Space_65x18.png",
  sub1_10px: "sub1_10px.png",
  Tap_reader_36x38: "Tap_reader_36x38.png",
  Temperature_16x16: "Temperature_16x16.png",
  u2f_10px: "u2f_10px.png",
  unknown_10px: "unknown_10px.png",
  Unlock_7x8: "Unlock_7x8.png",
  // "Unplug_bg_bottom_128x10": "Unplug_bg_bottom_128x10.png",
  // "Unplug_bg_top_128x14": "Unplug_bg_top_128x14.png",
  Up_25x27: "Up_25x27.png",
  Up_hvr_25x27: "Up_hvr_25x27.png",
  update_10px: "update_10px.png",
  Updating_32x40: "Updating_32x40.png",
  UsbTree_48x22: "UsbTree_48x22.png",
  Vol_down_25x27: "Vol_down_25x27.png",
  Vol_down_hvr_25x27: "Vol_down_hvr_25x27.png",
  Vol_up_25x27: "Vol_up_25x27.png",
  Vol_up_hvr_25x27: "Vol_up_hvr_25x27.png",
  Voldwn_6x6: "Voldwn_6x6.png",
  Voltage_16x16: "Voltage_16x16.png",
  Volup_8x6: "Volup_8x6.png",
  Warning_30x23: "Warning_30x23.png",
  // "WarningDolphin_45x42": "WarningDolphin_45x42.png",
};

const displaySizes = [
  "8×8",
  "12×8",
  "32×8",
  "48×64",
  "64×8",
  "60×32",
  "64×32",
  "64×48",
  "64×128",
  "72×40",
  "84×48",
  "96×16",
  "96×32",
  "96×39",
  "96×40",
  "96×65",
  "96×68",
  "96×96",
  "100×64",
  "102×64",
  "122×32",
  "128×32",
  "128×36",
  "128×64",
  "128×80",
  "128×96",
  "128×128",
  "128×160",
  "144×168",
  "150×32",
  "160×16",
  "160×32",
  "160×80",
  "160×132",
  "160×160",
  "172×72",
  "192×32",
  "192×64",
  "192×96",
  "200×200",
  "206×36",
  "240×64",
  "240×128",
  "240×160",
  "256×128",
  "256×32",
  "256×64",
  "296×128",
  "320×200",
  "320×240",
  "400×240",
];

const KEYS = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  ESC: 27,
}
