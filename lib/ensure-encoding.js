'use babel';

import EnsureEncodingView from './ensure-encoding-view';
import { CompositeDisposable } from 'atom';

export default {

  ensureEncodingView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.ensureEncodingView = new EnsureEncodingView(state.ensureEncodingViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.ensureEncodingView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ensure-encoding:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ensureEncodingView.destroy();
  },

  serialize() {
    return {
      ensureEncodingViewState: this.ensureEncodingView.serialize()
    };
  },

  toggle() {
    console.log('EnsureEncoding was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
