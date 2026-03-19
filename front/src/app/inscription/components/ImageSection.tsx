'use client';

// import { useFormContext } from 'react-hook-form';
import { ChevronRight } from '@/components/ui/icons';
import { ButtonForm, StepIndicators } from '@/components';
import ImagePicker from './ImagePicker';
import { AuthLayout } from '@/components';
// import { NewUser } from '@/types';

export default function ImageSection({
  onBack,
  isLoading = false,
}: {
  onBack: () => void;
  isLoading?: boolean;
}) {
  //const { watch } = useFormContext<NewUser>();
  //const profileImage = watch('profileImage');

  return (
    <AuthLayout
      showBackButton
      onBack={onBack}>
      <div className="flex flex-col gap-6">
        <ImagePicker />

        <div className="space-y-6">
          <StepIndicators
            currentStep={3}
            numberOfSteps={3}
          />

          <ButtonForm
            type="submit"
            icon={<ChevronRight />}
            iconPosition="right"
            text={isLoading ? 'Chargement...' : 'Terminer'}
            style="dark"
            extraCss="w-full"
            disabled={isLoading}
          />
        </div>
      </div>
    </AuthLayout>
  );
}
