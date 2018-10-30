import 'tinymce/themes/silver/Theme';

import { Log, Pipeline, FocusTools, Chain, Guard } from '@ephox/agar';
import { UnitTest } from '@ephox/bedrock';
import { TinyApis, TinyLoader, TinyUi } from '@ephox/mcagar';
import { Element } from '@ephox/sugar';
import CharmapPlugin from 'tinymce/plugins/charmap/Plugin';
import { document } from '@ephox/dom-globals';

const cFakeEvent = function (name) {
  return Chain.control(
    Chain.op(function (elm: Element) {
      const evt = document.createEvent('HTMLEvents');
      evt.initEvent(name, true, true);
      elm.dom().dispatchEvent(evt);
    }),
    Guard.addLogging('Fake event')
  );
};

UnitTest.asynctest('browser.tinymce.plugins.charmap.CharmapUserDefinedTest', (success, failure) => {

  CharmapPlugin();

  TinyLoader.setup(function (editor, onSuccess, onFailure) {
    const tinyApis = TinyApis(editor);
    const tinyUi = TinyUi(editor, {toolBarSelector: '.tox-toolbar'});
    const doc = Element.fromDom(document);

    Pipeline.async({},
      Log.steps('TBA', 'Charmap: User defined charmap', [
        tinyApis.sFocus,
        tinyApis.sFocus,
        tinyUi.sClickOnToolbar('click charmap', 'button[aria-label="Special character"]'),
        tinyUi.sWaitForPopup('wait for popup', 'div[role="dialog"]'),
        FocusTools.sTryOnSelector('Focus should have moved to input', doc, 'input'),
        FocusTools.sSetActiveValue(doc, 'A'),
        Chain.asStep(doc, [
          FocusTools.cGetFocused,
          cFakeEvent('input')
        ]),
        tinyUi.sWaitForUi('wait for character A', '.tox-collection span:contains(A)')
      ])
    , onSuccess, onFailure);
  }, {
    plugins: 'charmap',
    toolbar: 'charmap',
    charmap: [['A'.charCodeAt(0), 'A']],
    theme: 'silver',
    skin_url: '/project/js/tinymce/skins/oxide',
  }, success, failure);
});
