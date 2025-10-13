import { type Metadata } from 'next';
import Container from '@/components/Container';
import Header from '@/layout/components/Header';
import Content from '@landing/components/Content';

//* Metadata -------------------------
export const metadata: Metadata = {
    title: 'Terms of Service | Reverse Email Lookup',
    description:
        'Review the Terms of Service for Reverse Email Lookup. Understand your rights, permitted use, data accuracy, and legal obligations when using our email enrichment tools and API.',
    alternates: {
        canonical: '/terms'
    }
};

//* Component -------------------------
const PrivacyPolicyPage = () => {
    return (
        <div className='tablet:mb-32 relative mb-24'>
            <Header title='Terms of Service' className='!pt-32 !pb-24' />
            <Container>
                <ul className='laptop:mt-32 mt-24 [&>*:not(:first-child)]:mt-14'>
                    <li>
                        <Content>
                            <Content.Text>
                                Welcome to <span className='text-neutral-dark4 font-bold'>Reverse Email Lookup </span>
                                (reverseemaillookup.net). By accessing or using our website, services, API, or any
                                affiliated applications, you agree to comply with and be bound by the following terms
                                and conditions.
                            </Content.Text>
                            <Content.Text className='mt-4'>
                                Please read them carefully before using our services.
                            </Content.Text>
                        </Content>
                    </li>
                    <li>
                        <Content>
                            <Content.Title>1. Acceptance of Terms</Content.Title>
                            <Content.Text>
                                By using Reverse Email Lookup, you confirm that you are at least 18 years old and
                                legally capable of entering into a binding agreement. If you do not agree to these
                                terms, please do not use the website or our services.
                            </Content.Text>
                        </Content>
                    </li>
                    <li>
                        <Content>
                            <Content.Title>2. Description of Service</Content.Title>
                            <Content.Text>
                                Reverse Email Lookup provides tools to enrich email addresses with publicly available
                                and licensed data, helping users identify information related to a person or company
                                based on an email address. Our services are intended for lawful uses, such as research,
                                lead generation, or data enrichment.
                            </Content.Text>
                        </Content>
                    </li>
                    <li>
                        <Content>
                            <Content.Title>3. Permitted Use</Content.Title>
                            <Content.Text>You may use our services for:</Content.Text>
                            <Content.List
                                items={[
                                    'Research and analysis',
                                    'Business or B2B lead generation',
                                    'Marketing and outreach (within legal limits)',
                                    'Personal contact organization'
                                ]}
                            />
                            <Content.Text className='mt-6'>You agree not to use the service for:</Content.Text>
                            <Content.List
                                items={[
                                    'Spamming or unsolicited communications',
                                    'Harassment or invasion of privacy',
                                    'Any unlawful purpose or to violate any law or regulation',
                                    'Scraping or bulk downloading our data without explicit written consent'
                                ]}
                            />
                        </Content>
                    </li>
                    <li>
                        <Content>
                            <Content.Title>4. Account & API Access</Content.Title>
                            <Content.Text>
                                If you access our API, you are responsible for maintaining the confidentiality of your
                                API key and any activity that occurs under your account. We reserve the right to suspend
                                or terminate access if we detect abuse, unauthorized use, or any violation of these
                                terms.
                            </Content.Text>
                        </Content>
                    </li>
                    <li>
                        <Content>
                            <Content.Title>5. Data Accuracy</Content.Title>
                            <Content.Text>
                                While we strive to provide accurate and up-to-date information, we do not guarantee the
                                accuracy, completeness, or reliability of the data. The results depend on publicly
                                available and third-party licensed sources, which may be outdated or incomplete.
                            </Content.Text>
                        </Content>
                    </li>
                    <li>
                        <Content>
                            <Content.Title>6. Privacy Policy</Content.Title>
                            <Content.Text>
                                Your use of the service is also governed by our Privacy Policy, which outlines how we
                                collect, use, and protect your data.
                            </Content.Text>
                        </Content>
                    </li>
                    <li>
                        <Content>
                            <Content.Title>7. Intellectual Property</Content.Title>
                            <Content.Text>
                                All content, design, text, graphics, and software used on reverseemaillookup.net are
                                owned by us or our licensors and are protected under applicable copyright, trademark,
                                and intellectual property laws. You may not reproduce, distribute, or create derivative
                                works without explicit permission.
                            </Content.Text>
                        </Content>
                    </li>
                    <li>
                        <Content>
                            <Content.Title>8. Limitation of Liability</Content.Title>
                            <Content.Text>
                                We shall not be held liable for any direct, indirect, incidental, or consequential
                                damages resulting from the use or inability to use our service, including loss of data,
                                revenue, or business opportunities.
                            </Content.Text>
                            <Content.Text className='mt-4'>Use of our service is at your own risk.</Content.Text>
                        </Content>
                    </li>
                    <li>
                        <Content>
                            <Content.Title>9. Termination</Content.Title>
                            <Content.Text>
                                We reserve the right to suspend or terminate your access to our services at any time,
                                with or without notice, for conduct that we believe violates these terms or is harmful
                                to other users, us, or third parties.
                            </Content.Text>
                        </Content>
                    </li>
                    <li>
                        <Content>
                            <Content.Title>10. Modifications to Terms</Content.Title>
                            <Content.Text>
                                We may update these Terms of Service from time to time. When we do, we will revise the
                                &quot;Last Updated&quot; date at the top. It is your responsibility to review this page
                                periodically to stay informed of any changes.
                            </Content.Text>
                        </Content>
                    </li>
                    <li>
                        <Content>
                            <Content.Title>11. Governing Law</Content.Title>
                            <Content.Text>
                                These terms shall be governed and construed in accordance with the laws of the
                                jurisdiction in which the company operates, without regard to its conflict of law
                                provisions.
                            </Content.Text>
                        </Content>
                    </li>
                    <li>
                        <Content>
                            <Content.Title>12. Contact Us</Content.Title>
                            <Content.Text>
                                If you have any questions about these Terms, please contact us at:
                            </Content.Text>
                            <Content.Text>
                                <a
                                    href='mailto:info@reverseemaillookup.net'
                                    className='text-body-lg text-primary font-bold'
                                >
                                    info@reverseemaillookup.net
                                </a>
                            </Content.Text>
                        </Content>
                    </li>
                </ul>
            </Container>
        </div>
    );
};

export default PrivacyPolicyPage;
