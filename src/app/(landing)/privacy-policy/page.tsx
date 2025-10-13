import { type Metadata } from 'next';
import Icon from '@/components/Icon';
import Container from '@/components/Container';
import Header from '@/layout/components/Header';
import Content from '@landing/components/Content';

//* Metadata -------------------------
export const metadata: Metadata = {
    title: 'Privacy Policy | Reverse Email Lookup',
    description:
        'Learn how ReverseEmailLookup.net collects, uses, stores, and protects your personal information. We are committed to GDPR and CCPA compliance.',
    alternates: {
        canonical: '/privacy-policy'
    }
};

//* Component -------------------------
const PrivacyPolicyPage = () => {
    return (
        <div className='tablet:mb-32 relative mb-24'>
            <Header title='Privacy Policy' className='!pt-32 !pb-24' />
            <Container>
                <ul className='laptop:mt-32 mt-24 [&>*:not(:first-child)]:mt-14'>
                    <li>
                        <Content>
                            <Content.Text>
                                At <span className='text-neutral-dark4 font-bold'>ReverseEmailLookup.net</span>, we are
                                committed to protecting your privacy and ensuring the security of your personal
                                information. This Privacy Policy outlines how we collect, use, share, and safeguard your
                                data when you visit our website, use our services, or interact with our platform.
                            </Content.Text>
                        </Content>
                    </li>
                    <li>
                        <Content>
                            <Content.Title>1. Information We Collect</Content.Title>
                            <Content.Text>We collect the following types of information:</Content.Text>
                            <Content.List
                                title='User-Provided Information'
                                items={[
                                    'Email address',
                                    'Company name',
                                    'Contact details (if you register or contact us)',
                                    'Billing information (for paid services)'
                                ]}
                            />
                            <Content.List
                                title='Lookup Data'
                                items={[
                                    'Email addresses submitted for reverse lookup',
                                    'IP address and timestamps of lookup requests'
                                ]}
                            />
                            <Content.List
                                title='Automatically Collected Data'
                                items={[
                                    'Browser type and version',
                                    'Operating system',
                                    'Device identifiers',
                                    'Referral URLs',
                                    'Pages visited and usage behavior'
                                ]}
                            />
                        </Content>
                    </li>
                    <li>
                        <Content>
                            <Content.Title>2. How We Use Your Information</Content.Title>
                            <Content.Text>We use collected information for the following purposes:</Content.Text>
                            <Content.List
                                items={[
                                    'To provide and operate the reverse email lookup service',
                                    'To process transactions and manage billing',
                                    'To improve website functionality and user experience',
                                    'To provide customer support and respond to inquiries',
                                    'To ensure legal compliance (e.g. fraud prevention, data protection)',
                                    'To send service-related communications'
                                ]}
                            />
                        </Content>
                    </li>
                    <li>
                        <Content>
                            <Content.Title>3. Data from Reverse Lookups</Content.Title>
                            <Content.Text>
                                When you use our{' '}
                                <span className='text-neutral-dark4 font-bold'>Reverse Email Lookup</span> or API, we
                                process the submitted email addresses to return publicly or commercially available B2B
                                data. This may include:
                            </Content.Text>
                            <Content.List
                                items={[
                                    'Full name',
                                    'Job title',
                                    'Company affiliation',
                                    'LinkedIn profile',
                                    'Company website and domain'
                                ]}
                            />
                            <Content.Text>
                                We do <span className='text-neutral-dark4 font-bold'>not</span> retain or share lookup
                                queries for any purpose other than returning results and service optimization.
                            </Content.Text>
                        </Content>
                    </li>
                    <li>
                        <Content>
                            <Content.Title>4. Cookies and Tracking Technologies</Content.Title>
                            <Content.Text>We use cookies and similar technologies to:</Content.Text>
                            <Content.List
                                items={[
                                    'Remember user preferences',
                                    'Analyze website traffic',
                                    'Enhance functionality and performance'
                                ]}
                            />
                            <Content.Text className='mt-4'>
                                You can manage cookie preferences via your browser settings.
                            </Content.Text>
                        </Content>
                    </li>
                    <li>
                        <Content>
                            <Content.Title>5. Third-Party Services</Content.Title>
                            <Content.Text>We may use trusted third-party vendors for:</Content.Text>
                            <Content.List
                                items={[
                                    'Web analytics (e.g. Google Analytics)',
                                    'Payment processing (e.g. Stripe)',
                                    'Email communication (e.g. SendGrid)'
                                ]}
                            />
                            <Content.Text className='mt-4'>
                                These providers are bound by confidentiality agreements and data protection laws.
                            </Content.Text>
                        </Content>
                    </li>
                    <li>
                        <Content>
                            <Content.Title>6. Data Retention</Content.Title>
                            <Content.Text>We retain user and lookup data only as long as necessary for:</Content.Text>
                            <Content.List
                                items={[
                                    'Providing services',
                                    'Meeting legal obligations',
                                    'Resolving disputes and enforcing agreements'
                                ]}
                            />
                        </Content>
                    </li>
                    <li>
                        <Content>
                            <Content.Title>7. Data Security</Content.Title>
                            <Content.Text>We implement strong security measures, including:</Content.Text>
                            <Content.List
                                items={[
                                    'HTTPS encryption',
                                    'Firewall and intrusion detection systems',
                                    'Secure data storage protocols'
                                ]}
                            />
                            <Content.Text className='mt-4'>
                                While we strive to protect your data, no method of transmission is 100% secure.
                            </Content.Text>
                        </Content>
                    </li>
                    <li>
                        <Content>
                            <Content.Title>8. Your Privacy Rights</Content.Title>
                            <ul>
                                <li>
                                    <Content.List title='GDPR (EU/EEA Users)' />
                                    <Content.Text>You have the right to:</Content.Text>
                                    <Content.List
                                        items={[
                                            'Access your personal data',
                                            'Request correction or deletion',
                                            'Object to data processing',
                                            'Request data portability'
                                        ]}
                                    />
                                    <Content.Text>
                                        To exercise your rights, contact us at:{' '}
                                        <a
                                            href='mailto:privacy@reverseemaillookup.net'
                                            className='text-body-lg text-primary font-bold'
                                        >
                                            privacy@reverseemaillookup.net
                                        </a>
                                    </Content.Text>
                                </li>
                                <li>
                                    <Content.List title='CCPA (California Residents)' />
                                    <Content.Text>You may:</Content.Text>
                                    <Content.List
                                        items={[
                                            "Request disclosure of data we collect and how it's used",
                                            'Request deletion of your data',
                                            'Opt out of data selling (we do not sell personal data)'
                                        ]}
                                    />
                                    <Content.Text>
                                        To make a request, email:{' '}
                                        <a
                                            href='mailto:privacy@reverseemaillookup.net'
                                            className='text-body-lg text-primary font-bold'
                                        >
                                            privacy@reverseemaillookup.net
                                        </a>
                                    </Content.Text>
                                </li>
                            </ul>
                        </Content>
                    </li>
                    <li>
                        <Content>
                            <Content.Title>9. Children’s Privacy</Content.Title>
                            <Content.Text>
                                Our services are not intended for children under 16, and we do not knowingly collect
                                data from them.
                            </Content.Text>
                        </Content>
                    </li>
                    <li>
                        <Content>
                            <Content.Title>10. Changes to This Policy</Content.Title>
                            <Content.Text>
                                We may update this Privacy Policy from time to time. All changes will be posted here
                                with the updated effective date. Continued use of our services constitutes acceptance of
                                the changes.
                            </Content.Text>
                        </Content>
                    </li>
                    <li>
                        <Content>
                            <Content.Title>11. Contact Us</Content.Title>
                            <Content.Text>
                                If you have questions about this Privacy Policy, please contact us at:
                            </Content.Text>
                            <div className='flex items-center gap-2'>
                                <Icon icon='ic:round-email' size='md' />
                                <a
                                    href='mailto:privacy@reverseemaillookup.net'
                                    className='text-body-lg text-primary block font-bold'
                                >
                                    privacy@reverseemaillookup.net
                                </a>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Icon icon='pepicons-pop:internet' size='md' />
                                <a
                                    href='https://reverseemaillookup.net'
                                    className='text-body-lg text-primary block font-bold underline'
                                >
                                    https://reverseemaillookup.net
                                </a>
                            </div>
                        </Content>
                    </li>
                </ul>
            </Container>
        </div>
    );
};

export default PrivacyPolicyPage;
