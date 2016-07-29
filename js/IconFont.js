/**
 * IconFont icon set component.
 * Usage: <IconFont name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from 'react-native-vector-icons';
const glyphMap = {
  "check": 58880,
  "edit": 58881,
  "phone": 58882,
  "camera": 58900,
  "back": 58883,
  "cascades": 58901,
  "form": 58884,
  "right": 58885,
  "home": 58886,
  "homefill": 58887,
  "message": 58888,
  "lock": 58889,
  "friend": 58890,
  "add": 58891,
  "info": 58892,
  "copy": 58902,
  "notice": 58893,
  "friendfill": 58894,
  "people": 58895,
  "safe": 58896,
  "messagefill": 58897,
  "my": 58898,
  "myfill": 58899,
  "video": 58903
};

let IconFont = createIconSet(glyphMap, 'iconfont', 'iconfont.ttf');

module.exports = IconFont;
module.exports.glyphMap = glyphMap;
