
// pages/settings/index.js
import SettingsOption from '@/app/ui/Setting/SettingOption';


export default function Settings() {

  return (
    <div className="p-2 max-w-md mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Account Settings</h2>

      <SettingsOption title="Change Password"  />

      <SettingsOption title="Delete Account" isDestructive />
    </div>
  );
}
