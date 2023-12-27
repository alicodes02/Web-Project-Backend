const express = require('express');
const { google } = require('googleapis');
const dotenv = require('dotenv');
const dayjs = require('dayjs');
const { v4: uuid } = require('uuid');

dotenv.config();

const app = express.Router();
const scopes = [
    'https://www.googleapis.com/auth/calendar'
];

const Oauth2Client = new google.auth.OAuth2(
    '932534104608-duj5u9fdvc942u18u1vhr8vm2v3pqq35.apps.googleusercontent.com',
    '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',
    'http://localhost:3001/google/redirect',
);

const calendar = google.calendar({
    version: 'v3',
    auth: 'AIzaSyDWZxan2kbDvpN7QAGbJ11R5KzXbra4W9I'
});

app.get('/check', (req, res) => {
    const url = Oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
    });
    res.redirect(url);
});

app.get('/google/redirect', async (req, res) => {
    const code = req.query.code;
    const { tokens } = await Oauth2Client.getToken(code);
    Oauth2Client.setCredentials(tokens);

    res.send({ message: 'Successful Login' });
});

app.get('/schedule', async (req, res) => {
    console.log(Oauth2Client.credentials.access_token);

    await calendar.events.insert({
        calendarId: 'primary',
        auth: Oauth2Client,
        conferenceDataVersion: 1,
        requestBody: {
            summary: 'Test Event',
            description: 'Some Work',
            start: {
                dateTime: dayjs(new Date()).add(1, 'day').add(45, 'minutes').toISOString(),
                timeZone: 'Asia/Karachi',
            },
            end: {
                dateTime: dayjs(new Date()).add(1, 'day').add(1, 'hour').toISOString(),
                timeZone: 'Asia/Karachi',
            },
            conferenceData: {
                createRequest: {
                    requestId: uuid(),
                }
            },
            attendees: [{
                email: 'footballersfc90@gmail.com'
            }],
        }
    });
    res.json({ message: 'Successful' });
});

module.exports = app;
