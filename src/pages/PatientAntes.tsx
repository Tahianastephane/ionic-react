import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonLabel, IonCheckbox, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const PatientAntes: React.FC = () => {
  const [answers, setAnswers] = useState<any>({
    ageInferieur18Ans: false,
    ageSuperieur38Ans: false,
    primipareAgeePlus35Ans: false,
    pariteSuperieure5: false,
    dernierAccouchementMoins2Ans: false,
    bassinRetreciAsymetrique: false,
    taSup148: false,
    diabete: false,
    dyspnee: false,
    intervention: false,
    grossesseGemellaire: false,
    antecedent: false,
    mortNe: false,
    faussesCouches: false,
    habitude: false,
  });

  const history = useHistory();

  // Handle checkbox changes
  const handleCheckboxChange = (field: string, value: boolean) => {
    setAnswers((prevState: any) => ({
      ...prevState,
      [field]: value, // Update the state based on "Yes" or "No"
    }));
  };

  // Function to save data or navigate
  const handleSubmit = () => {
    console.log("Answers submitted:", answers);
    // Here you can save the data or navigate to the next page
    history.push('/home'); // Example redirection after form submission
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Patient Antecedents</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Patient Antecedents</h2>
        <p>Veuillez répondre aux questions suivantes en sélectionnant "Oui" ou "Non".</p>

        {/* Use IonGrid to create a table-like structure */}
        <IonGrid>
          {/* Question: Age inférieur à 18 ans */}
          <IonRow>
            <IonCol size="6">
              <IonLabel>Age inférieur à 18 ans</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={answers.ageInferieur18Ans}
                onIonChange={() => handleCheckboxChange('ageInferieur18Ans', true)}
              />
              <IonLabel>Oui</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={!answers.ageInferieur18Ans}
                onIonChange={() => handleCheckboxChange('ageInferieur18Ans', false)}
              />
              <IonLabel>Non</IonLabel>
            </IonCol>
          </IonRow>

          {/* Question: Age supérieur à 38 ans */}
          <IonRow>
            <IonCol size="6">
              <IonLabel>Age supérieur à 38 ans</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={answers.ageSuperieur38Ans}
                onIonChange={() => handleCheckboxChange('ageSuperieur38Ans', true)}
              />
              <IonLabel>Oui</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={!answers.ageSuperieur38Ans}
                onIonChange={() => handleCheckboxChange('ageSuperieur38Ans', false)}
              />
              <IonLabel>Non</IonLabel>
            </IonCol>
          </IonRow>

          {/* Question: Primipare âgée de plus de 35 ans */}
          <IonRow>
            <IonCol size="6">
              <IonLabel>Primipare âgée de plus de 35 ans</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={answers.primipareAgeePlus35Ans}
                onIonChange={() => handleCheckboxChange('primipareAgeePlus35Ans', true)}
              />
              <IonLabel>Oui</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={!answers.primipareAgeePlus35Ans}
                onIonChange={() => handleCheckboxChange('primipareAgeePlus35Ans', false)}
              />
              <IonLabel>Non</IonLabel>
            </IonCol>
          </IonRow>

          {/* Question: Parité supérieure à 5 */}
          <IonRow>
            <IonCol size="6">
              <IonLabel>Parité supérieure à 5</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={answers.pariteSuperieure5}
                onIonChange={() => handleCheckboxChange('pariteSuperieure5', true)}
              />
              <IonLabel>Oui</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={!answers.pariteSuperieure5}
                onIonChange={() => handleCheckboxChange('pariteSuperieure5', false)}
              />
              <IonLabel>Non</IonLabel>
            </IonCol>
          </IonRow>

          {/* Question: Dernier accouchement il y a moins de 2 ans */}
          <IonRow>
            <IonCol size="6">
              <IonLabel>Dernier accouchement il y a moins de 2 ans</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={answers.dernierAccouchementMoins2Ans}
                onIonChange={() => handleCheckboxChange('dernierAccouchementMoins2Ans', true)}
              />
              <IonLabel>Oui</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={!answers.dernierAccouchementMoins2Ans}
                onIonChange={() => handleCheckboxChange('dernierAccouchementMoins2Ans', false)}
              />
              <IonLabel>Non</IonLabel>
            </IonCol>
          </IonRow>

          {/* Question: Bassin rétréci asymétrique */}
          <IonRow>
            <IonCol size="6">
              <IonLabel>Bassin rétréci asymétrique</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={answers.bassinRetreciAsymetrique}
                onIonChange={() => handleCheckboxChange('bassinRetreciAsymetrique', true)}
              />
              <IonLabel>Oui</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={!answers.bassinRetreciAsymetrique}
                onIonChange={() => handleCheckboxChange('bassinRetreciAsymetrique', false)}
              />
              <IonLabel>Non</IonLabel>
            </IonCol>
          </IonRow>

          {/* Question: TA supérieure à 14/8 */}
          <IonRow>
            <IonCol size="6">
              <IonLabel>TA supérieure à 14/8</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={answers.taSup148}
                onIonChange={() => handleCheckboxChange('taSup148', true)}
              />
              <IonLabel>Oui</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={!answers.taSup148}
                onIonChange={() => handleCheckboxChange('taSup148', false)}
              />
              <IonLabel>Non</IonLabel>
            </IonCol>
          </IonRow>

          {/* Question: Diabète */}
          <IonRow>
            <IonCol size="6">
              <IonLabel>Diabète</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={answers.diabete}
                onIonChange={() => handleCheckboxChange('diabete', true)}
              />
              <IonLabel>Oui</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={!answers.diabete}
                onIonChange={() => handleCheckboxChange('diabete', false)}
              />
              <IonLabel>Non</IonLabel>
            </IonCol>
          </IonRow>

          {/* Question: Dyspnée */}
          <IonRow>
            <IonCol size="6">
              <IonLabel>Dyspnée</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={answers.dyspnee}
                onIonChange={() => handleCheckboxChange('dyspnee', true)}
              />
              <IonLabel>Oui</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={!answers.dyspnee}
                onIonChange={() => handleCheckboxChange('dyspnee', false)}
              />
              <IonLabel>Non</IonLabel>
            </IonCol>
          </IonRow>

          {/* Question: Intervention chirurgicale */}
          <IonRow>
            <IonCol size="6">
              <IonLabel>Intervention chirurgicale</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={answers.intervention}
                onIonChange={() => handleCheckboxChange('intervention', true)}
              />
              <IonLabel>Oui</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={!answers.intervention}
                onIonChange={() => handleCheckboxChange('intervention', false)}
              />
              <IonLabel>Non</IonLabel>
            </IonCol>
          </IonRow>

          {/* Question: Grossesse gemellaire */}
          <IonRow>
            <IonCol size="6">
              <IonLabel>Grossesse gemellaire</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={answers.grossesseGemellaire}
                onIonChange={() => handleCheckboxChange('grossesseGemellaire', true)}
              />
              <IonLabel>Oui</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={!answers.grossesseGemellaire}
                onIonChange={() => handleCheckboxChange('grossesseGemellaire', false)}
              />
              <IonLabel>Non</IonLabel>
            </IonCol>
          </IonRow>

          {/* Question: Antécédents médicaux */}
          <IonRow>
            <IonCol size="6">
              <IonLabel>Antécédents médicaux</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={answers.antecedent}
                onIonChange={() => handleCheckboxChange('antecedent', true)}
              />
              <IonLabel>Oui</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={!answers.antecedent}
                onIonChange={() => handleCheckboxChange('antecedent', false)}
              />
              <IonLabel>Non</IonLabel>
            </IonCol>
          </IonRow>

          {/* Question: Mort-né */}
          <IonRow>
            <IonCol size="6">
              <IonLabel>Mort-né</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={answers.mortNe}
                onIonChange={() => handleCheckboxChange('mortNe', true)}
              />
              <IonLabel>Oui</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={!answers.mortNe}
                onIonChange={() => handleCheckboxChange('mortNe', false)}
              />
              <IonLabel>Non</IonLabel>
            </IonCol>
          </IonRow>

          {/* Question: Fausses couches */}
          <IonRow>
            <IonCol size="6">
              <IonLabel>Fausses couches</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={answers.faussesCouches}
                onIonChange={() => handleCheckboxChange('faussesCouches', true)}
              />
              <IonLabel>Oui</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={!answers.faussesCouches}
                onIonChange={() => handleCheckboxChange('faussesCouches', false)}
              />
              <IonLabel>Non</IonLabel>
            </IonCol>
          </IonRow>

          {/* Question: Habitude */}
          <IonRow>
            <IonCol size="6">
              <IonLabel>Habitude</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={answers.habitude}
                onIonChange={() => handleCheckboxChange('habitude', true)}
              />
              <IonLabel>Oui</IonLabel>
            </IonCol>
            <IonCol size="3">
              <IonCheckbox
                checked={!answers.habitude}
                onIonChange={() => handleCheckboxChange('habitude', false)}
              />
              <IonLabel>Non</IonLabel>
            </IonCol>
          </IonRow>

        </IonGrid>

        <IonButton expand="full" onClick={handleSubmit}>Ajouter</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default PatientAntes;
