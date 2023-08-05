import { StoreModule } from "@ngrx/store";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { authorizationReducer } from "./reducer";
import { AuthorizationEffects } from "./effects";
import { AppStateEnum } from "../rootReducer";
import { AuthService } from "src/app/shared/services/auth.service";

@NgModule({
	declarations: [],
	imports: [
    StoreModule.forFeature(AppStateEnum.Authorization, authorizationReducer), EffectsModule.forFeature(AuthorizationEffects)
  ],
  providers: [AuthService]
})
export class AuthorizationStoreFeatureModule {}
