import Container from '@/components/Container';
import Content from '@landing/components/Content';

//* Types -------------------------
type Props = {
    title?: string;
    titleClassName?: string;
};

//* Component -------------------------
const StoryReview = ({ title = 'Our Story', titleClassName = '' }: Props) => {
    return (
        <div className='mx-auto max-w-[830px]'>
            <div className='tablet:w-2/6 w-full'>
                <h2 className={`text-headline-lg text-neutral-dark4 mt-3 ${titleClassName}`}>{title}</h2>
            </div>
            <ul className='mt-12 w-full [&>li]:not-first:mt-5'>
                <li>
                    <Content>
                        <Content.Text>
                            At <span className='text-neutral-dark4 font-bold'>ReverseEmailLookup.net</span>, everything
                            started with a simple question:
                        </Content.Text>
                        <Content.Text>
                            “What if you could turn any email address into a gateway to real business intelligence?”
                        </Content.Text>
                        <Content.Text>
                            From that idea, we built a platform that empowers sales teams, marketers, recruiters, and
                            developers to instantly access accurate, up-to-date B2B data—starting with just an email.
                        </Content.Text>
                    </Content>
                </li>
                <li>
                    <Content>
                        <Content.Text>
                            Our journey began when our founders—experts in data science, SaaS, and digital marketing—saw
                            a clear gap in the market. While businesses were drowning in disconnected tools and outdated
                            contact lists, there was no fast, reliable way to enrich leads or verify contacts in
                            real-time. So, we decided to build it.
                        </Content.Text>
                    </Content>
                </li>
                <li>
                    <Content>
                        <Content.Text>
                            The result is a powerful API and bulk lookup service that transforms a single email into a
                            complete professional profile. Whether it’s full names, job titles, company domains, social
                            profiles, or more, our engine aggregates and structures data from trusted sources to deliver
                            what you need, when you need it.
                        </Content.Text>
                    </Content>
                </li>
                <li>
                    <Content>
                        <Content.Text>
                            But we didn’t stop at data. Our goal has always been to{' '}
                            <span className='text-neutral-dark4 font-bold'>make data actionable</span>—which is why our
                            tools are designed for ease of integration, scalability, and performance. Whether
                            you&apos;re building internal dashboards, automating outreach, or integrating with your CRM,
                            our platform gives you the data foundation you can trust.
                        </Content.Text>
                    </Content>
                </li>
                <li>
                    <Content>
                        <Content.Text>
                            Today, <span className='text-neutral-dark4 font-bold'>ReverseEmailLookup.net</span> serves
                            clients across industries, from startups to enterprise teams. We process thousands of
                            lookups daily, help users identify leads, clean up databases, and power smarter
                            decision-making.
                        </Content.Text>
                    </Content>
                </li>
                <li>
                    <Content>
                        <Content.Text>
                            We’re proud of how far we’ve come—but more excited for what’s ahead. As we continue to
                            innovate and expand, our mission remains the same:
                        </Content.Text>
                        <Content.Text>
                            to make identity resolution effortless, fast, and reliable for every business.
                        </Content.Text>
                    </Content>
                </li>
            </ul>
        </div>
    );
};

export default StoryReview;
