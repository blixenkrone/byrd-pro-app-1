
interface ISlackBody<T> {
  text: string;
}

interface ISlackResponse {
  status: string;
}

interface IMailSlackNotification {
  storyId: string;
  assignment: {
    medias: string[]
  }
  profileProps: {
    displayName: string;
    profilePicure: string;
  }
  headline: string;
}

export type SlackResponse = ISlackResponse;
export type MailSlackNotification = IMailSlackNotification;
