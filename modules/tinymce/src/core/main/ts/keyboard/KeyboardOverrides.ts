/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */

import ArrowKeys from './ArrowKeys';
import BoundarySelection from './BoundarySelection';
import DeleteBackspaceKeys from './DeleteBackspaceKeys';
import EnterKey from './EnterKey';
import SpaceKey from './SpaceKey';
import CaretContainerInput from '../caret/CaretContainerInput';
import Editor from '../api/Editor';
import * as InputKeys from './InputKeys';
import HomeEndKeys from './HomeEndKeys';
import * as Rtc from '../Rtc';

const registerKeyboardOverrides = (editor: Editor) => {
  const caret = BoundarySelection.setupSelectedState(editor);

  CaretContainerInput.setup(editor);
  ArrowKeys.setup(editor, caret);
  DeleteBackspaceKeys.setup(editor, caret);
  EnterKey.setup(editor);
  SpaceKey.setup(editor);
  InputKeys.setup(editor);
  HomeEndKeys.setup(editor);
};

const setup = (editor: Editor): void => {
  Rtc.ignore(editor, () => registerKeyboardOverrides(editor));
};

export default {
  setup
};
