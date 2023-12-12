
// pages/settings/index.js
import SettingsOption from '@/app/ui/Setting/SettingOption';


export default function Settings() {

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Account Settings</h2>

      <SettingsOption title="Change Password" description="Update your account password" />

      <SettingsOption title="Delete Account" description="Permanently delete your account" isDestructive />
    </div>
  );
}
