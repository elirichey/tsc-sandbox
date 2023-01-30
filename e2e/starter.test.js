import {by, device, element, expect, detox, config} from 'detox';

describe('CommunityView', () => {
  beforeEach(async () => {
    if (typeof device == 'undefined') {
      await detox.init(config);
    }
    await device.reloadReactNative();
  });

  //beforeAll(async () => {
  //  await device.launchApp();
  //});

  //beforeEach(async () => {
  //  await device.reloadReactNative();
  //});

  it('should display gallery lightbox', async () => {
    await element(by.id('GALLERY_TRIGGER')).tap();
    await expect(element(by.id('GALLERY_LIGHTBOX'))).toBeVisible();
  });

  //it('should have welcome screen', async () => {
  //  await expect(element(by.id('welcome'))).toBeVisible();
  //});

  //it('should show hello screen after tap', async () => {
  //  await element(by.id('hello_button')).tap();
  //  await expect(element(by.text('Hello!!!'))).toBeVisible();
  //});

  //it('should show world screen after tap', async () => {
  //  await element(by.id('world_button')).tap();
  //  await expect(element(by.text('World!!!'))).toBeVisible();
  //});
});
