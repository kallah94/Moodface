/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MoodComponentsPage, MoodDeleteDialog, MoodUpdatePage } from './mood.page-object';

const expect = chai.expect;

describe('Mood e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let moodUpdatePage: MoodUpdatePage;
  let moodComponentsPage: MoodComponentsPage;
  let moodDeleteDialog: MoodDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Moods', async () => {
    await navBarPage.goToEntity('mood');
    moodComponentsPage = new MoodComponentsPage();
    await browser.wait(ec.visibilityOf(moodComponentsPage.title), 5000);
    expect(await moodComponentsPage.getTitle()).to.eq('moodfaceApp.mood.home.title');
  });

  it('should load create Mood page', async () => {
    await moodComponentsPage.clickOnCreateButton();
    moodUpdatePage = new MoodUpdatePage();
    expect(await moodUpdatePage.getPageTitle()).to.eq('moodfaceApp.mood.home.createOrEditLabel');
    await moodUpdatePage.cancel();
  });

  it('should create and save Moods', async () => {
    const nbButtonsBeforeCreate = await moodComponentsPage.countDeleteButtons();

    await moodComponentsPage.clickOnCreateButton();
    await promise.all([
      moodUpdatePage.setCommentaireInput('commentaire'),
      moodUpdatePage.moodSelectLastOption(),
      moodUpdatePage.agentSelectLastOption()
    ]);
    expect(await moodUpdatePage.getCommentaireInput()).to.eq('commentaire', 'Expected Commentaire value to be equals to commentaire');
    await moodUpdatePage.save();
    expect(await moodUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await moodComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Mood', async () => {
    const nbButtonsBeforeDelete = await moodComponentsPage.countDeleteButtons();
    await moodComponentsPage.clickOnLastDeleteButton();

    moodDeleteDialog = new MoodDeleteDialog();
    expect(await moodDeleteDialog.getDialogTitle()).to.eq('moodfaceApp.mood.delete.question');
    await moodDeleteDialog.clickOnConfirmButton();

    expect(await moodComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
