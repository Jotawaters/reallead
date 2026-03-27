/**
 * Demo mode: enabled when Clerk keys are not configured.
 * Allows previewing the app without authentication.
 */
export const DEMO_MODE =
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY === "pk_test_PLACEHOLDER";

export const DEMO_USER = {
  userId: "demo-user-001",
  orgId: "demo-company-001",
  email: "demo@realleadtools.com",
  fullName: "Usuario Demo",
};
