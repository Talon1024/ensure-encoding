'use babel';

import { CompositeDisposable } from 'atom';

export default {

  configuration: null,
  subscriptions: null,

  config: {
      files: {
          type: "string",
          default: ""
      },
      fileTypes: {
          type: "string",
          default: ""
      }
  },

  activate(state) {

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
    this.configuration = {
        "files": {}, // e.g. "/home/you/Documents/abc.txt": "windows1257"
        "filetypes": {} // e.g. ".log": "windows1252", ".txt": "windows1252", ".c": "windows1257"
    }

    this.subscriptions.add(atom.workspace.observeTextEditors(this.editorChanged));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    return {
      //ensureEncodingViewState: this.ensureEncodingView.serialize()
    };
  },

  editorChanged(curEditor) {
    console.log('EnsureEncoding: text editor changed.');
    var fpath = curEditor.getPath();
    console.log('Current file path: ', fpath);
  },

  changeEncoding(file, encoding) {
    console.log('EnsureEncoding was toggled!');
    return true;
  }

};
