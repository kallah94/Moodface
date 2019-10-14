// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MoodComponentsPage, /* MoodDeleteDialog, */ MoodUpdatePage } from './mood.page-object';

const expect = chai.expect;

describe('Mood e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let moodUpdatePage: MoodUpdatePage;
  let moodComponentsPage: MoodComponentsPage;
  /* let moodDeleteDialog: MoodDeleteDialog; */

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
    expect(await moodComponentsPage.getTitle()).to.eq('moodface1App.mood.home.title');
  });

  it('should load create Mood page', async () => {
    await moodComponentsPage.clickOnCreateButton();
    moodUpdatePage = new MoodUpdatePage();
    expect(await moodUpdatePage.getPageTitle()).to.eq('moodface1App.mood.home.createOrEditLabel');
    await moodUpdatePage.cancel();
  });

  /*  it('should create and save Moods', async () => {
        const nbButtonsBeforeCreate = await moodComponentsPage.countDeleteButtons();

        await moodComponentsPage.clickOnCreateButton();
        await promise.all([
            moodUpdatePage.moodSelectLastOption(),
            moodUpdatePage.setCommentInput('comment'),
            moodUpdatePage.setDateInput('2000-12-31'),
            moodUpdatePage.userSelectLastOption(),
        ]);
        expect(await moodUpdatePage.getCommentInput()).to.eq('comment', 'Expected Comment value to be equals to comment');
        expect(await moodUpdatePage.getDateInput()).to.eq('2000-12-31', 'Expected date value to be equals to 2000-12-31');
        const selectedAnonymous = moodUpdatePage.getAnonymousInput();
        if (await selectedAnonymous.isSelected()) {
            await moodUpdatePage.getAnonymousInput().click();
            expect(await moodUpdatePage.getAnonymousInput().isSelected(), 'Expected anonymous not to be selected').to.be.false;
        } else {
            await moodUpdatePage.getAnonymousInput().click();
            expect(await moodUpdatePage.getAnonymousInput().isSelected(), 'Expected anonymous to be selected').to.be.true;
        }
        await moodUpdatePage.save();
        expect(await moodUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await moodComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last Mood', async () => {
        const nbButtonsBeforeDelete = await moodComponentsPage.countDeleteButtons();
        await moodComponentsPage.clickOnLastDeleteButton();

        moodDeleteDialog = new MoodDeleteDialog();
        expect(await moodDeleteDialog.getDialogTitle())
            .to.eq('moodface1App.mood.delete.question');
        await moodDeleteDialog.clickOnConfirmButton();

        expect(await moodComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
