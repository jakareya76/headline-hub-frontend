import faqImg from "../assets/faq.svg";

const Faq = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 py-20 md:flex-row">
      <div className="w-full md:w-1/2">
        <img src={faqImg} alt="faq" className="" />
      </div>
      <div className="flex flex-col w-full gap-5 md:w-1/2">
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="text-xl font-medium collapse-title">
            What is HeadlineHub?
          </div>
          <div className="collapse-content">
            <p>
              HeadlineHub is your go-to source for the latest news and trending
              articles from a variety of publishers. Our platform offers a
              diverse range of news topics to keep you informed and up-to-date.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" />
          <div className="text-xl font-medium collapse-title">
            How do I subscribe to premium content?
          </div>
          <div className="collapse-content">
            <p>
              To subscribe to our premium content, navigate to the subscription
              page and select your preferred subscription period (1 minute, 5
              days, or 10 days). Follow the prompts to complete the payment
              process using Stripe. After your subscription period ends, your
              account will revert to a normal user status.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" />
          <div className="text-xl font-medium collapse-title">
            How is my subscription period tracked?
          </div>
          <div className="collapse-content">
            <p>
              We track your subscription period by updating the premiumTaken
              property in your user profile with the subscription start date and
              duration. Each time you log in, we check if your subscription
              period has expired and update your status accordingly.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" />
          <div className="text-xl font-medium collapse-title">
            How do I filter articles by publisher or tags?
          </div>
          <div className="collapse-content">
            <p>
              On the All Articles page, you can filter articles by entering
              keywords in the search bar, selecting a publisher from the
              dropdown menu, or choosing tags. The articles will update
              dynamically based on your selected filters.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" />
          <div className="text-xl font-medium collapse-title">
            How can I view the publication statistics?
          </div>
          <div className="collapse-content">
            <p>
              Publication statistics can be viewed on the Admin page, where we
              display a dynamic pie chart showing the percentage of articles
              published by each publisher. This chart helps you understand the
              distribution of articles across different publishers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
