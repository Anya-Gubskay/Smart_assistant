import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AnalyticsPage} from '../../entities/analytics.entity';
import {OverviewPage} from '../../entities/overview.entity';

@Injectable({providedIn: 'root'})
export class AnalyticsService {
	constructor(private http: HttpClient) {}

	getDataOverview(): Observable<OverviewPage.Overview> {
		return this.http.get<OverviewPage.Overview>('/api/analytics/overview');
	}

	getDataCharts(): Observable<AnalyticsPage.Analytics> {
		return this.http.get<AnalyticsPage.Analytics>('/api/analytics/analytics');
	}
}
