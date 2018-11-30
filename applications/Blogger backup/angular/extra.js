

<table *ngIf="userDetails" class="table-fill">
  <thead>
      <tr>
          <th colspan="2" class="text-center">User Profile</th>
      </tr>
  </thead>

  <tbody>
      <tr>
          <td>First Name</td>
          <td>{{userDetails.fullName.split(' ')[0]}}</td>
      </tr>
      <tr>
          <td>Last Name</td>
          <td>{{userDetails.fullName.split(' ')[1]}}</td>
      </tr>
      <tr>
          <td>Email</td>
          <td>{{userDetails.email}}</td>
      </tr>
      <tr>
          <td colspan="2" class="text-center">
              <input type="button" (click)="onLogout()" value="Logout" />
          </td>
      </tr>
  </tbody>
</table>