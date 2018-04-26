import { Selector, ClientFunction } from 'testcafe';

fixture `Auth`
  .page `http://localhost:3000`;

const getPageUrl = ClientFunction(() => window.location.href.toString());

const joinInputContainer = Selector('#joinDynamicInput');
const joinInvalidInput = Selector('#joinDynamicInput:invalid');
const joinMessageError = Selector('#join-errors');

const loginInputContainer = Selector('#loginDynamicInput');
const loginInvalidInput = Selector('#loginDynamicInput:invalid');
const loginMessageError = Selector('#login-errors');


//Create user account

test('fail when email is empty', async t => {
    //const emptyError = Selector('#submit-button').exists;
    await t
        .click(joinInputContainer)
        .pressKey('enter')
        .expect(joinInvalidInput.count).eql(1);
});

test('fail when email not email type input', async t =>{
    await t
        .typeText(joinInputContainer, 'nonEmailText', { paste: true })
        .pressKey('enter')
        .expect(joinInvalidInput.count).eql(1);

});

test('fail when name is empty', async t => {
    await t
        .typeText(joinInputContainer, 'a@a', { paste: true })
        .pressKey('enter')
        .pressKey('enter')
        .expect(joinInvalidInput.count).eql(1);
});

test('fail when password is empty', async t => {
    await t
        .typeText(joinInputContainer, 'a@a', { paste: true })
        .pressKey('enter')
        .typeText(joinInputContainer, 'a', { paste: true })
        .pressKey('enter')
        .pressKey('enter')
        .expect(joinInvalidInput.count).eql(1);
});

test('Successfully create new user', async t => {
  await t
    .typeText(joinInputContainer, 'a2@2a', { paste: true })
    .pressKey('enter')
    .typeText(joinInputContainer, 'a', { paste: true })
    .pressKey('enter')
    .typeText(joinInputContainer, 'apass', { paste: true })
    .pressKey('enter')
    .wait(3000)
    .expect(getPageUrl()).contains('/dashboard', { timeout: 5000 });
});

test('fail when email already exists', async t => {
  await t
    .typeText(joinInputContainer, 'a@a', { paste: true })
    .pressKey('enter')
    .typeText(joinInputContainer, 'b', { paste: true })
    .pressKey('enter')
    .typeText(joinInputContainer, 'pass', { paste: true })
    .pressKey('enter')
    .expect(joinMessageError.innerText).eql('email must be unique')
});


//Login

test('fail when email is empty', async t => {
    await t
        .click(loginInputContainer)
        .pressKey('enter')
        .expect(loginInvalidInput.count).eql(1);
});

test('fail when email not email type input', async t =>{
    await t
        .typeText(loginInputContainer, 'nonEmailText', { paste: true })
        .pressKey('enter')
        .expect(loginInvalidInput.count).eql(1);
});

test('fail when password is empty', async t => {
    await t
        .typeText(loginInputContainer, 'a@a', { paste: true })
        .pressKey('enter')
        .pressKey('enter')
        .expect(loginInvalidInput.count).eql(1);
});

test('fail when email is invalid', async t => {
    await t
        .typeText(loginInputContainer, 'b@b', { paste: true })
        .pressKey('enter')
        .typeText(loginInputContainer, 'apass', { paste: true })
        .pressKey('enter')
        .expect(loginMessageError.innerText).eql('email or password is incorrect')
});

test('fail when password is invalid', async t => {
    await t
        .typeText(loginInputContainer, 'b@b', { paste: true })
        .pressKey('enter')
        .typeText(loginInputContainer, 'apass', { paste: true })
        .pressKey('enter')
        .expect(loginMessageError.innerText).eql('email or password is incorrect')
});


test('Successfully log in', async t => {
    await t
        .typeText(loginInputContainer, 'b@b', { paste: true })
        .pressKey('enter')
        .typeText(loginInputContainer, 'apass', { paste: true })
        .pressKey('enter')
        .wait(3000)
        .expect(getPageUrl()).contains('/dashboard', { timeout: 5000 });
});