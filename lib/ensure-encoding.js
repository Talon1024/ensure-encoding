'use babel';

import EnsureEncodingView from './ensure-encoding-view';
import { CompositeDisposable } from 'atom';

export default {

  configuration: null,
  subscriptions: null,

  activate(state) {

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    //this.subscriptions.add(atom.workspace.onDidChangeActivePaneItem(callback));
    this.subscriptions.add(atom.workspace.observeTextEditors(editorChanged));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    return {
      ensureEncodingViewState: this.ensureEncodingView.serialize()
    };
  },

  editorChanged(curEditor, otherEditors) {
      console.log('EnsureEncoding: text editor changed.');
      console.log(curEditor);
      console.log(otherEditors);
  },

  changeEncoding(file, encoding) {
    console.log('EnsureEncoding was toggled!');
    return true;
  }

};
