import EmberRoute from '@ember/routing/route';

export default class Route extends EmberRoute {
  beforeModel() {
    this.replaceWith('docs');
  }
}
