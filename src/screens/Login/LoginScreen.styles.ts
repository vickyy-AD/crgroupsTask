import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
    },
    scrollContent: {
        flexGrow: 1,
    },
    topSection: {
        height: '28%',
        backgroundColor: COLORS.LIGHT_ORANGE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTextContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: -20,
    },
    welcomeText: {
        fontSize: 34,
        fontWeight: '900',
        color: COLORS.WHITE,
        letterSpacing: -1,
    },
    subWelcomeText: {
        fontSize: 16,
        color: COLORS.ORANGE_PASTEL,
        fontWeight: '600',
        marginTop: 4,
    },
    logoContainer: {
        marginBottom: -180,
        zIndex: 10,
    },
    logoBox: {
        width: 100,
        height: 100,
        backgroundColor: COLORS.WHITE,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 8,
    },
    logoCircle: {
        width: 80,
        height: 80,
        backgroundColor: COLORS.ORANGE_PASTEL,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoIcon: {
        fontSize: 40,
    },
    contentContainer: {
        flex: 1,
    },
    formSection: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 100,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: COLORS.TEXT_PRIMARY,
        marginBottom: 32,
        letterSpacing: -0.5,
    },
    forgotPasswordContainer: {
        alignItems: 'flex-end',
        marginTop: -8,
        marginBottom: 24,
    },
    forgotPasswordText: {
        fontSize: 14,
        color: COLORS.LIGHT_ORANGE,
        fontWeight: '600',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
        marginBottom: 8,
    },
    registerText: {
        fontSize: 14,
        color: COLORS.TEXT_SECONDARY,
    },
    registerLink: {
        fontSize: 14,
        color: COLORS.LIGHT_ORANGE,
        fontWeight: '700',
    },
    footer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto',
        paddingBottom: 20,
    },
    footerText: {
        fontSize: 13,
        color: COLORS.TEXT_SECONDARY,
        lineHeight: 20,
    },
    linkText: {
        fontSize: 13,
        color: COLORS.LIGHT_ORANGE,
        fontWeight: '700',
        textDecorationLine: 'underline',
    },
});
