import styled from "styled-components";

const Answer = styled.div``;
const Question = styled.div``;
const QuestionGroup = styled.div``;

export default function FrequentlyAskedQuestions() {
  return (
    <div>
      <h3>Frequently Asked Questions</h3>
      <QuestionGroup>
        <Question>How do I contact a human?</Question>
        <Answer>
          We only have humans here. You can write us at{" "}
          <a href="mailto:henslowescloud@gmail.com">henslowescloud@gmail.com</a>
        </Answer>
      </QuestionGroup>
      <QuestionGroup>
        <Question>Why do you use Google login? Do I have to?</Question>
        <Answer>
          We're using Google login because it's free and secure. It keeps us
          from having to keep track of your password or manage password resets
          and security.
        </Answer>
      </QuestionGroup>
      <QuestionGroup>
        <Question>Who can see my personal info?</Question>
        <Answer>
          It depends on the kind of job they have and how it relates to yours.
          <ul>
            <li>
              <strong>Only you can edit your info.</strong>
            </li>
            <li>
              <strong>
                People who are currently working on a production or at a theater
                with you can see:
              </strong>
              <ul>
                <li>Your phone number</li>
                <li>Your schedule conflicts</li>
                <li>Your rehearsal schedule</li>
              </ul>
            </li>
            <li>
              <strong>
                People with administrative jobs on a production or at a theater
                where you are working or have worked can see:
              </strong>
              <ul>
                <li>Your address</li>
                <li>Your emergency contact info</li>
                <li>Your legal name</li>
                <li>Your birthdate</li>
              </ul>
            </li>
            <li>
              <strong>
                People who have worked with you, or are currently working with
                you, on a production or at a theater can see:
              </strong>
              <ul>
                <li>Your email</li>
              </ul>
            </li>
            <li>
              <strong>Everyone can see:</strong>
              <ul>
                <li>Your preferred name</li>
                <li>Your name as it will appear in show programs</li>
                <li>Your website</li>
                <li>Your gender</li>
                <li>Your description</li>
                <li>Your bio</li>
                <li>Your timezone</li>
                <li>
                  Your current and past jobs in participating theaters
                  (including casting)
                </li>
              </ul>
            </li>
          </ul>
        </Answer>
      </QuestionGroup>
      <QuestionGroup>
        <Question>What counts as an administrative job?</Question>
        <Answer>
          <div>
            This may change as we refine our system. At the moment,
            administrative job titles are as follows.
          </div>
          <div>
            <strong>For theaters:</strong>
            <ul>
              <li>Executive Director</li>
              <li>Artistic Director</li>
              <li>Technical Director</li>
              <li>
                Theater Admin (generally, whoever created the theater within
                Henslowe's Cloud)
              </li>
            </ul>
          </div>
          <div>
            <strong>For productions:</strong>
            <ul>
              <li>Producer</li>
              <li>Director</li>
              <li>Stage Manager</li>
              <li>
                Production Admin (generally, whoever created the production
                within Henslowe's Cloud)
              </li>
            </ul>
          </div>
        </Answer>
      </QuestionGroup>
    </div>
  );
}
