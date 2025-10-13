import { ResponseCodes } from '@/types/ResponseCode';

const responseCodes = new Map([
    //* PUBLIC Response -----------------------------
    [ResponseCodes.PUBLIC_REQUEST_PROCESSED_SUCCESS, 'The request processed successfully.'],
    [ResponseCodes.PUBLIC_REQUEST_PROCESSED_FAILED_ERR, 'The request failed to process. Please try again later.'],
    [
        ResponseCodes.PUBLIC_VALIDATION_ERR,
        'There was a validation error with the input data. Please check the input and try again.'
    ],
    [
        ResponseCodes.PUBLIC_RECAPTCHA_VALIDATION_FAILED_ERR,
        'ReCAPTCHA validation failed. Please verify you are not a robot.'
    ],
    [
        ResponseCodes.PUBLIC_INSUFFICIENT_CREDITS_ERR,
        'You do not have enough credits to complete this action. Please add credits to your account.'
    ],
    [ResponseCodes.PUBLIC_RATE_LIMIT_EXCEEDED_ERR, 'Too many requests. Please slow down and try again later.'],
    //* AUTH Response -----------------------------
    [
        ResponseCodes.AUTH_INVALID_CREDENTIALS,
        'The credentials provided are invalid. Please check your username and password.'
    ],
    [
        ResponseCodes.AUTH_USER_SIGNUP_SUCCESS,
        'User successfully signed up. Please check your email for confirmation instructions.'
    ],
    [ResponseCodes.AUTH_SIGNUP_CONFIRMATION_CODE_SENT_SUCCESS, 'A confirmation code has been sent to your email.'],
    [ResponseCodes.AUTH_FORGOT_PASSWORD_CODE_SENT_SUCCESS, 'A password reset code has been sent to your email.'],
    [ResponseCodes.AUTH_RESET_PASSWORD_SUCCESS, 'Your password has been successfully reset.'],
    [
        ResponseCodes.AUTH_RECAPTCHA_VALIDATION_FAILED_ERR,
        'ReCAPTCHA validation failed during the authentication process.'
    ],
    [
        ResponseCodes.AUTH_SIGNUP_EMAIL_EXISTS_ERR,
        'An account with this email already exists. Please use a different email or log in.'
    ],
    [
        ResponseCodes.AUTH_WRONG_SIGNUP_CONFIRMATION_CODE_ERR,
        'The confirmation code entered is incorrect. Please check and try again.'
    ],
    [ResponseCodes.AUTH_USER_ALREADY_CONFIRMED_ERR, 'Your account has already been confirmed.'],
    [ResponseCodes.AUTH_USER_SIGNIN_NO_ACCOUNT_ERR, 'No account found with the provided credentials. '],
    [ResponseCodes.AUTH_USER_SIGNIN_WRONG_CREDENTIALS_ERR, 'The sign-in credentials are incorrect. Please try again.'],
    [
        ResponseCodes.AUTH_USER_UNCONFIRMED_ERR,
        'Your account is not confirmed yet. Please check your email to complete the confirmation process.'
    ],
    [
        ResponseCodes.AUTH_USER_AUTHORIZATION_FAILED_ERR,
        'You are not authorized to perform this action. Please check your permissions.'
    ],
    [
        ResponseCodes.AUTH_RESET_PASSWORD_WRONG_CODE_ERR,
        'The password reset code is incorrect or expired. Please request a new one.'
    ],
    [ResponseCodes.AUTH_EMAIL_DOMAIN_VERIFICATION_FAILED_ERR, 'Enter valid email with valid domain.'],
    //* USER Response -----------------------------
    [ResponseCodes.USER_API_KEY_REGENERATED_SUCCESS, 'Your API key has been successfully regenerated.'],
    [ResponseCodes.USER_ACTIVITY_CREATED_SUCCESS, 'User activity created successfully.'],
    [ResponseCodes.USER_NOT_FOUND_ERR, 'User not found. Please check the entered user information and try again.'],
    [ResponseCodes.USER_SUSPENDED_ERR, 'Your account has been suspended. Please contact support for more details.'],
    [ResponseCodes.USER_DELETED_ERR, 'The user has been deleted. The action cannot be completed.'],
    //* BULK Response -----------------------------
    [ResponseCodes.BULK_LIST_FETCHED, 'The bulk list was fetched successfully.'],
    [ResponseCodes.BULK_INFO_FETCHED, 'Bulk information retrieved successfully.'],
    [ResponseCodes.BULK_DOWNLOAD_SUCCESS, 'The bulk download was successful.'],
    [ResponseCodes.BULK_NOT_FOUND_ERR, 'No bulk data found for the requested action.'],
    [ResponseCodes.BULK_DELETED_SUCCESS, 'Bulk deleted successfully.'],
    [ResponseCodes.BULK_IS_PROCESSING_ERR, 'Bulk processing is currently ongoing. Please try again later.'],
    //* API Response -----------------------------
    [ResponseCodes.API_LOGS_LIST_FETCHED, 'API logs retrieved successfully.'],
    //* PLAN Response -----------------------------
    [ResponseCodes.PLANS_LIST_FETCHED, 'Plans retrieved successfully.'],
    [ResponseCodes.PLAN_NOT_FOUND_ERR, 'The requested plan does not exist or could not be found.'],
    //* SUBSCRIPTION Response -----------------------------
    [ResponseCodes.SUBSCRIPTIONS_LIST_FETCHED, 'Subscriptions retrieved successfully.'],
    [ResponseCodes.SUBSCRIPTIONS_NEW_CHECKOUT_SESSION_CREATED, 'New checkout session created successfully.'],
    //* INTEGRATION Response -----------------------------
    [ResponseCodes.INTEGRATIONS_ZOHO_CONNECTION_SUCCESS, 'Zoho connected successfully.'],
    [ResponseCodes.INTEGRATIONS_ZOHO_DISCONNECTION_SUCCESS, 'Zoho disconnected successfully.'],
    [ResponseCodes.INTEGRATIONS_HUBSPOT_CONNECTION_SUCCESS, 'HubSpot connected successfully.'],
    [ResponseCodes.INTEGRATIONS_HUBSPOT_DISCONNECTION_SUCCESS, 'HubSpot disconnected successfully.'],
    [ResponseCodes.INTEGRATIONS_SALESFORCE_CONNECTION_SUCCESS, 'Salesforce connected successfully.'],
    [ResponseCodes.INTEGRATIONS_SALESFORCE_DISCONNECTION_SUCCESS, 'Salesforce disconnected successfully.'],
    [ResponseCodes.INTEGRATIONS_BULK_PUSH_SUCCESS, 'Bulk pushed successfully.'],
    [ResponseCodes.INTEGRATIONS_ZOHO_NOT_CONNECTED_ERR, 'Zoho is not connected.'],
    [ResponseCodes.INTEGRATIONS_ZOHO_ALREADY_CONNECTED_ERR, 'Zoho is already connected.'],
    [ResponseCodes.INTEGRATIONS_ZOHO_TOKEN_EXPIRED_ERR, 'Zoho connection token has expired. Please reconnect.'],
    [ResponseCodes.INTEGRATIONS_ZOHO_CONNECTION_FAILED_ERR, 'Failed to connect to Zoho. Please try again.'],
    [ResponseCodes.INTEGRATIONS_HUBSPOT_NOT_CONNECTED_ERR, 'HubSpot is not connected.'],
    [ResponseCodes.INTEGRATIONS_HUBSPOT_ALREADY_CONNECTED_ERR, 'HubSpot is already connected.'],
    [ResponseCodes.INTEGRATIONS_HUBSPOT_TOKEN_EXPIRED_ERR, 'HubSpot connection token has expired. Please reconnect.'],
    [ResponseCodes.INTEGRATIONS_HUBSPOT_CONNECTION_FAILED_ERR, 'Failed to connect to HubSpot. Please try again.'],
    [ResponseCodes.INTEGRATIONS_SALESFORCE_NOT_CONNECTED_ERR, 'Salesforce is not connected.'],
    [ResponseCodes.INTEGRATIONS_SALESFORCE_ALREADY_CONNECTED_ERR, 'Salesforce is already connected.'],
    [
        ResponseCodes.INTEGRATIONS_SALESFORCE_TOKEN_EXPIRED_ERR,
        'Salesforce connection token has expired. Please reconnect.'
    ],
    [ResponseCodes.INTEGRATIONS_SALESFORCE_CONNECTION_FAILED_ERR, 'Failed to connect to Salesforce. Please try again.']
]);

export default responseCodes;

//? Usage:
// responseCodes.get(ResponseCodes.PUBLIC_REQUEST_PROCESSED_SUCCESS) --> return response message
